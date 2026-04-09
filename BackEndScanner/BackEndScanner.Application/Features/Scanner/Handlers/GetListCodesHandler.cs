using BackEndScanner.Application.Features.Scanner.Queries;
using BackEndScanner.Application.Features.Scanner.Services;
using MediatR;

namespace BackEndScanner.Application.Features.Scanner.Handlers;

public class GetListCodesHandler : IRequestHandler<GetListCodesQuery, List<string>>
{
    private readonly IScannerService _service;

    public GetListCodesHandler(IScannerService service)
    {
        _service = service;
    }

    public async Task<List<string>> Handle(GetListCodesQuery request, CancellationToken ct)
    {
        return await _service.GetScannerCodesAsync();
    }
}