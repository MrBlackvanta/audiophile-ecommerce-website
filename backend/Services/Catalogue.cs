public sealed record CatalogueProduct(string Slug, string Name, int Price);

public static class Catalogue
{
    static readonly Dictionary<string, CatalogueProduct> BySlug = new CatalogueProduct[]
    {
        new("xx99-mark-two-headphones", "XX99 MK II", 2999),
        new("xx99-mark-one-headphones", "XX99 MK I", 1750),
        new("xx59-headphones", "XX59", 899),
        new("zx9-speaker", "ZX9", 4500),
        new("zx7-speaker", "ZX7", 3500),
        new("yx1-earphones", "YX1", 599),
    }.ToDictionary(product => product.Slug, StringComparer.Ordinal);

    public static CatalogueProduct? Find(string slug) =>
        BySlug.TryGetValue(slug, out var product) ? product : null;
}
