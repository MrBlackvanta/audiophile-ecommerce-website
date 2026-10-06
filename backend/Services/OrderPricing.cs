public sealed record PricedLine(string Slug, string Name, int UnitPrice, int Quantity)
{
    public int LineTotal => UnitPrice * Quantity;
}

public sealed record OrderTotals(
    IReadOnlyList<PricedLine> Lines,
    int Total,
    int Shipping,
    int Vat,
    int GrandTotal
);

public static class OrderPricing
{
    public const int ShippingFee = 50;

    const decimal VatRate = 0.2m;

    public static OrderTotals Price(IReadOnlyList<PricedLine> lines)
    {
        var total = lines.Sum(line => line.LineTotal);
        var vat = (int)Math.Round(total * VatRate, MidpointRounding.AwayFromZero);

        return new OrderTotals(lines, total, ShippingFee, vat, total + ShippingFee);
    }
}
