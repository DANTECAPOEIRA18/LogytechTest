using Microsoft.EntityFrameworkCore;
using BackEndScanner.Domain.Entities;

namespace BackEndScanner.Infrastructure.Persistance;

public class AppDbcontext : DbContext
{
    public DbSet<SerialScanner> Scanners => Set<SerialScanner>();

    public AppDbcontext(DbContextOptions<AppDbcontext> options) : base(options)
    {
        
    }
}