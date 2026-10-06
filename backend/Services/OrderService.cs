public class OrderService(OrderDbContext db, TimeProvider clock) : IOrderService
{
    public async Task<OrderDto> PlaceAsync(OrderDraft draft, CancellationToken token)
    {
        var totals = OrderPricing.Price(draft.Lines);

        var order = new Order
        {
            Id = Guid.CreateVersion7(),
            Reference = OrderReference.Next(),
            PlacedAt = clock.GetUtcNow(),
            Name = draft.Customer.Name,
            Email = draft.Customer.Email,
            Phone = draft.Customer.Phone,
            Address = draft.Customer.Address,
            Zip = draft.Customer.Zip,
            City = draft.Customer.City,
            Country = draft.Customer.Country,
            PaymentMethod = draft.PaymentMethod,
            Total = totals.Total,
            Shipping = totals.Shipping,
            IncludedVat = totals.Vat,
            GrandTotal = totals.GrandTotal,
            Lines =
            [
                .. totals.Lines.Select(
                    (line, position) =>
                        new OrderLine
                        {
                            Position = position,
                            Slug = line.Slug,
                            Name = line.Name,
                            UnitPrice = line.UnitPrice,
                            Quantity = line.Quantity,
                        }
                ),
            ],
        };

        db.Orders.Add(order);
        await db.SaveChangesAsync(token);

        return new OrderDto(
            order.Reference,
            order.PlacedAt,
            [
                .. order.Lines.Select(line => new OrderLineDto(
                    line.Slug,
                    line.Name,
                    line.UnitPrice,
                    line.Quantity
                )),
            ],
            order.Total,
            order.Shipping,
            order.IncludedVat,
            order.GrandTotal
        );
    }
}
