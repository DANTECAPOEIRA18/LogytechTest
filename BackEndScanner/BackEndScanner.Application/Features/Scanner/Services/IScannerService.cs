using BackEndScanner.Domain.Entities;

namespace BackEndScanner.Application.Features.Scanner.Services;

public interface IScannerService
{
    Task<Guid> CreateScannerCodeAsync(string serial);
    Task<List<string>> GetScannerCodesAsync();
    Task<SerialScanner?> GetSerialCode(string serial);
}