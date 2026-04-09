using Microsoft.EntityFrameworkCore;
using BackEndScanner.Infrastructure.Persistance;
using BackEndScanner.Infrastructure.Repositories;
using BackEndScanner.Application.Features.Scanner.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using BackEndScanner.Domain.Interfaces;

namespace BackEndScanner.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfraestructure(this IServiceCollection s, IConfiguration c)
    {
        var conn = c.GetConnectionString("Default");

        s.AddDbContext<AppDbcontext>(o => o.UseSqlServer(conn));
        s.AddScoped<IScannerRepository, ScannerRepository>();
        s.AddScoped<ISaveChanges, SaveChanges>();

        s.AddScoped<IScannerService, ScannerService>();

        return s;
    }
}
