public record CustomerRequest(
    string? Name,
    string? Email,
    string? Phone,
    string? Address,
    string? Zip,
    string? City,
    string? Country
);

public record OrderLineRequest(string? Slug, int Quantity);

public record PlaceOrderRequest(
    CustomerRequest? Customer,
    string? PaymentMethod,
    IReadOnlyList<OrderLineRequest?>? Items
);

public record OrderLineDto(string Slug, string Name, int UnitPrice, int Quantity);

public record OrderDto(
    string Reference,
    DateTimeOffset PlacedAt,
    IReadOnlyList<OrderLineDto> Items,
    int Total,
    int Shipping,
    int IncludedVat,
    int GrandTotal
);
