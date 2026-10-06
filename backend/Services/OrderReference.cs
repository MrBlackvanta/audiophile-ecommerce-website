using System.Security.Cryptography;

public static class OrderReference
{
    const string Alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

    const int Digits = 8;

    public static string Next() => $"AP-{RandomNumberGenerator.GetString(Alphabet, Digits)}";
}
