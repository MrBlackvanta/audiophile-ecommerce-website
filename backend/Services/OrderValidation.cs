using System.Diagnostics.CodeAnalysis;

public sealed record CustomerDetails(
    string Name,
    string Email,
    string Phone,
    string Address,
    string Zip,
    string City,
    string Country
);

public sealed record OrderDraft(
    CustomerDetails Customer,
    string PaymentMethod,
    IReadOnlyList<PricedLine> Lines
);

public static class OrderValidation
{
    public static bool TryReview(
        PlaceOrderRequest? request,
        [NotNullWhen(true)] out OrderDraft? draft,
        [NotNullWhen(false)] out string? rejection
    )
    {
        draft = null;

        if (request is null)
        {
            rejection = "An order needs a JSON body.";
            return false;
        }

        if (!TryReadLines(request.Items, out var lines, out rejection))
        {
            return false;
        }

        if (!TryReadCustomer(request.Customer, out var customer, out rejection))
        {
            return false;
        }

        var payment = request.PaymentMethod?.Trim() ?? "";

        if (!OrderLimits.PaymentMethods.Contains(payment, StringComparer.Ordinal))
        {
            rejection =
                $"Payment method must be one of {string.Join(", ", OrderLimits.PaymentMethods)}.";
            return false;
        }

        draft = new OrderDraft(customer, payment, lines);
        rejection = null;

        return true;
    }

    static bool TryReadLines(
        IReadOnlyList<OrderLineRequest?>? items,
        [NotNullWhen(true)] out IReadOnlyList<PricedLine>? lines,
        [NotNullWhen(false)] out string? rejection
    )
    {
        lines = null;

        if (items is null || items.Count == 0)
        {
            rejection = "An order needs at least one item.";
            return false;
        }

        if (items.Count > OrderLimits.LineCount)
        {
            rejection = $"An order holds at most {OrderLimits.LineCount} different products.";
            return false;
        }

        var priced = new List<PricedLine>(items.Count);
        var seen = new HashSet<string>(StringComparer.Ordinal);

        foreach (var item in items)
        {
            var slug = item?.Slug?.Trim() ?? "";

            if (slug.Length == 0 || slug.Length > OrderLimits.SlugLength)
            {
                rejection = "Every item needs a product slug.";
                return false;
            }

            if (!seen.Add(slug))
            {
                rejection = $"Product {slug} is listed twice; send one line per product.";
                return false;
            }

            var product = Catalogue.Find(slug);

            if (product is null)
            {
                rejection = $"{slug} is not a product we sell.";
                return false;
            }

            if (item!.Quantity < 1 || item.Quantity > OrderLimits.Quantity)
            {
                rejection = $"Quantity must be between 1 and {OrderLimits.Quantity}.";
                return false;
            }

            priced.Add(new PricedLine(product.Slug, product.Name, product.Price, item.Quantity));
        }

        lines = priced;
        rejection = null;

        return true;
    }

    static bool TryReadCustomer(
        CustomerRequest? customer,
        [NotNullWhen(true)] out CustomerDetails? details,
        [NotNullWhen(false)] out string? rejection
    )
    {
        details = null;

        if (customer is null)
        {
            rejection = "An order needs billing and shipping details.";
            return false;
        }

        string[] labels = ["Name", "Email", "Phone", "Address", "ZIP code", "City", "Country"];
        string?[] values =
        [
            customer.Name,
            customer.Email,
            customer.Phone,
            customer.Address,
            customer.Zip,
            customer.City,
            customer.Country,
        ];
        var trimmed = new string[values.Length];

        for (var field = 0; field < values.Length; field++)
        {
            trimmed[field] = values[field]?.Trim() ?? "";

            if (trimmed[field].Length == 0)
            {
                rejection = $"{labels[field]} cannot be empty.";
                return false;
            }

            if (trimmed[field].Length > OrderLimits.DetailLength)
            {
                rejection =
                    $"{labels[field]} is at most {OrderLimits.DetailLength} characters.";
                return false;
            }
        }

        details = new CustomerDetails(
            trimmed[0],
            trimmed[1],
            trimmed[2],
            trimmed[3],
            trimmed[4],
            trimmed[5],
            trimmed[6]
        );

        if (!LooksLikeEmail(details.Email))
        {
            rejection = "Email does not look like an address.";
            return false;
        }

        rejection = null;

        return true;
    }

    static bool LooksLikeEmail(string value)
    {
        var at = value.IndexOf('@');
        if (at <= 0 || at != value.LastIndexOf('@')) return false;

        var domain = value[(at + 1)..];
        var dot = domain.LastIndexOf('.');

        return dot > 0
            && dot < domain.Length - 1
            && !value.Any(char.IsWhiteSpace);
    }
}
