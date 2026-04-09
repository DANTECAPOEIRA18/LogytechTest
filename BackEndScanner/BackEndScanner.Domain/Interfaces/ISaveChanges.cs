namespace BackEndScanner.Domain.Interfaces;

public interface ISaveChanges
{
    Task<int> SaveChangesAsync();
}