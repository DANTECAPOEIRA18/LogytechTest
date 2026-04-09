namespace BackEndScanner.Domain.Entities;

public class SerialScanner
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string SerialProduct { get; private set; }
    public DateTime CreatedAt { get; private set; }

    public SerialScanner(string serialProduct)
    {
        SerialProduct = serialProduct;
        CreatedAt = DateTime.UtcNow;
    }
}