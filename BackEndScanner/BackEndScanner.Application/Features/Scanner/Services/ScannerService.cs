
using BackEndScanner.Domain.Interfaces;
using BackEndScanner.Domain.Entities;

namespace BackEndScanner.Application.Features.Scanner.Services;

public class ScannerService : IScannerService
{
    private readonly IScannerRepository _repo;
    private readonly ISaveChanges _save;

    public ScannerService(IScannerRepository repo, ISaveChanges save)
    {
        _repo = repo;
        _save = save;
    }

    public async Task<Guid> CreateScannerCodeAsync(string serial)
    {
        var newScanner = new SerialScanner(serial);

        await _repo.AddAsync(newScanner);
        await _save.SaveChangesAsync();

        return newScanner.Id;
    }
    public async Task<List<string>> GetScannerCodesAsync()
    {
        var listCodes = await _repo.GetAllAsync();
        return listCodes.Select(p => p.SerialProduct).ToList();
    }
    public async Task<SerialScanner?> GetSerialCode(string serial)
    {
        return await _repo.GetBySerialAsync(serial);
    }
}