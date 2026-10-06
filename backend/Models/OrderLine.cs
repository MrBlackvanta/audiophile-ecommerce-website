public class OrderLine
{
    public Guid OrderId { get; init; }

    public int Position { get; init; }

    public string Slug { get; init; } = "";

    public string Name { get; init; } = "";

    public int UnitPrice { get; init; }

    public int Quantity { get; init; }
}
