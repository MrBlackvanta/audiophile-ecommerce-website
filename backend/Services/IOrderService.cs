public interface IOrderService
{
    Task<OrderDto> PlaceAsync(OrderDraft draft, CancellationToken token);
}
