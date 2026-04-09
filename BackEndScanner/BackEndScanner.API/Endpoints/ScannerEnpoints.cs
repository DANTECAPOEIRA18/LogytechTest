using MediatR;
using BackEndScanner.Application.Features.Scanner.Commands;
using BackEndScanner.Application.Features.Scanner.Queries;

public static class ScannerEndpoints
{
    public static void MapScannerEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/scanner/list", async (IMediator m) =>
        {
            return Results.Ok(await m.Send(new GetListCodesQuery()));
        });

        app.MapPost("/scanner/create", async (CreateScannerCodeCommand cmd, IMediator m) =>
        {
            var result = await m.Send(cmd);
            return Results.Created($"/scanner/{result}", result);
        });
    }
}