using Microsoft.EntityFrameworkCore;

public class OrderDbContext(DbContextOptions<OrderDbContext> options, DatabaseSchema schema)
    : DbContext(options)
{
    public DbSet<Order> Orders => Set<Order>();

    public DbSet<OrderLine> OrderLines => Set<OrderLine>();

    protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
    {
        configurationBuilder.Properties<string>().HaveMaxLength(OrderLimits.DetailLength);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema(schema.Name);

        modelBuilder.Entity<Order>(b =>
        {
            b.HasKey(order => order.Id);
            b.Property(order => order.Id).ValueGeneratedNever();
            b.Property(order => order.Reference).HasMaxLength(OrderLimits.ReferenceLength);
            b.HasIndex(order => order.Reference).IsUnique();
            b.HasIndex(order => order.PlacedAt);
            b.HasMany(order => order.Lines)
                .WithOne()
                .HasForeignKey(line => line.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<OrderLine>(b =>
        {
            b.HasKey(line => new { line.OrderId, line.Position });
            b.Property(line => line.Slug).HasMaxLength(OrderLimits.SlugLength);
        });
    }
}
