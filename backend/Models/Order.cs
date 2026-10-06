public class Order
{
    public Guid Id { get; init; }

    public string Reference { get; init; } = "";

    public DateTimeOffset PlacedAt { get; init; }

    public string Name { get; init; } = "";

    public string Email { get; init; } = "";

    public string Phone { get; init; } = "";

    public string Address { get; init; } = "";

    public string Zip { get; init; } = "";

    public string City { get; init; } = "";

    public string Country { get; init; } = "";

    public string PaymentMethod { get; init; } = "";

    public int Total { get; init; }

    public int Shipping { get; init; }

    public int IncludedVat { get; init; }

    public int GrandTotal { get; init; }

    public List<OrderLine> Lines { get; init; } = [];
}
