using Microsoft.EntityFrameworkCore;
using BackEndScanner.Domain.Entities;
using BackEndScanner.Infrastructure.Persistance;

namespace BackEndScanner.Infrastructure.Repositories;

public class ScannerRepository : IScannerRepository
{
    private readonly AppDbcontext _ctx;

    public ScannerRepository(AppDbcontext ctx) => _ctx = ctx;

    public async Task<List<SerialScanner>> GetAllAsync() =>
        await _ctx.Scanners.AsNoTracking().ToListAsync();
    
    public async Task AddAsync(SerialScanner scanner) =>
        await _ctx.Scanners.AddAsync(scanner);

    public async Task <SerialScanner?> GetBySerialAsync(string serialProduct)
    {
        return await _ctx.Scanners.AsNoTracking().FirstOrDefaultAsync(s => s.SerialProduct == serialProduct);
    }
}