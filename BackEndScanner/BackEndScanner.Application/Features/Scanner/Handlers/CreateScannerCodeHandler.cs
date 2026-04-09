using MediatR;
using BackEndScanner.Application.Features.Scanner.Services;
using BackEndScanner.Application.Features.Scanner.Commands;
using System.ComponentModel.DataAnnotations;

namespace BackEndScanner.Application.Features.Scanner.Handlers;

public class CreateScannerCodeHandler : IRequestHandler<CreateScannerCodeCommand, Guid>
{
    private readonly IScannerService _service;

    public CreateScannerCodeHandler(IScannerService service)
    {
        _service = service;
    }

    public async Task<Guid> Handle(CreateScannerCodeCommand request, CancellationToken ct)
    {
        var consultCode = await _service.GetSerialCode(request.serial);
        if (consultCode is not null)
        {
            throw new Exception("El Código ya existe");
        }
        return await _service.CreateScannerCodeAsync(request.serial);
    }
}