using BackEndScanner.Domain.Interfaces;
using BackEndScanner.Infrastructure.Persistance;

namespace BackEndScanner.Infrastructure;

public class SaveChanges : ISaveChanges
{
    private readonly AppDbcontext _ctx;

    public SaveChanges(AppDbcontext ctx) => _ctx = ctx;

    public async Task<int> SaveChangesAsync() =>
        await _ctx.SaveChangesAsync();
}