using BackEndScanner.Domain.Entities;

public interface IScannerRepository
{
    Task<List<SerialScanner>> GetAllAsync();
    Task AddAsync(SerialScanner scanner);
    Task <SerialScanner?> GetBySerialAsync(string serialProduct);
}