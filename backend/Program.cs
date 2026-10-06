using System.Threading.RateLimiting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Scalar.AspNetCore;

const string ordersPolicy = "orders";

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});
builder.Services.AddOpenApi();
builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddScoped<IOrderService, OrderService>();

var schema = DatabaseSchema.Resolve(builder.Configuration);

builder.Services.AddSingleton(schema);
builder.Services.AddDbContext<OrderDbContext>(options =>
    options.UseNpgsql(
        DatabaseConnection.Resolve(builder.Configuration),
        npgsql => npgsql.MigrationsHistoryTable(HistoryRepository.DefaultTableName, schema.Name)
    )
);

builder.Services.AddProblemDetails();
builder
    .Services.AddHealthChecks()
    .AddDbContextCheck<OrderDbContext>(customTestQuery: OrdersTableResponds);

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
        RateLimitPartition.GetFixedWindowLimiter(
            Client(context),
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 60,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0,
            }
        )
    );
    options.AddPolicy(
        ordersPolicy,
        context =>
            RateLimitPartition.GetFixedWindowLimiter(
                Client(context),
                _ => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = 10,
                    Window = TimeSpan.FromMinutes(1),
                    QueueLimit = 0,
                }
            )
    );
});

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()
    );
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.UseHttpsRedirection();
}

app.UseForwardedHeaders();
app.UseExceptionHandler();
app.UseStatusCodePages();
app.UseCors();
app.Use(NeverCache);
app.UseRateLimiter();

app.MapHealthChecks("/health").DisableRateLimiting();

app.MapPost(
        "/api/orders",
        async (PlaceOrderRequest? request, IOrderService orders, CancellationToken token) =>
        {
            if (!OrderValidation.TryReview(request, out var draft, out var rejection))
            {
                return Results.Problem(
                    statusCode: StatusCodes.Status400BadRequest,
                    title: "Invalid order",
                    detail: rejection
                );
            }

            var placed = await orders.PlaceAsync(draft, token);

            return Results.Json(placed, statusCode: StatusCodes.Status201Created);
        }
    )
    .RequireRateLimiting(ordersPolicy)
    .WithName("PlaceOrder")
    .WithSummary("Place an order and get back its reference and the price it was placed at.")
    .WithDescription(
        "The client sends product slugs and quantities, never prices. Every line is re-priced "
            + "from the server's own catalogue, so a tampered cart cannot change what the order "
            + "is worth. VAT is 20% of the product total and is already included in it; shipping "
            + "is a flat $50 and is the only thing added to reach the grand total. Payment "
            + "details beyond the method are deliberately not accepted, so there is nothing "
            + "sensitive to store. An order is write-once and there is no account to own it, so "
            + "there is no read endpoint and the 201 carries no Location."
    )
    .WithTags("Orders")
    .Produces<OrderDto>(StatusCodes.Status201Created)
    .ProducesProblem(StatusCodes.Status400BadRequest)
    .ProducesProblem(StatusCodes.Status429TooManyRequests);

await DatabaseMigrations.EnsureUpToDateAsync<OrderDbContext>(app.Services);

app.Run();

static string Client(HttpContext context) =>
    context.Connection.RemoteIpAddress?.ToString() ?? "unknown";

static Task NeverCache(HttpContext context, RequestDelegate next)
{
    context.Response.Headers.CacheControl = "no-store";
    context.Response.Headers.Vary = "Origin";

    return next(context);
}

static async Task<bool> OrdersTableResponds(OrderDbContext db, CancellationToken token)
{
    await db.Orders.AnyAsync(token);

    return true;
}
