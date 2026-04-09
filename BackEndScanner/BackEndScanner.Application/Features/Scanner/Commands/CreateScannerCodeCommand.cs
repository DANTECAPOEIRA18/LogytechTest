using MediatR;

namespace BackEndScanner.Application.Features.Scanner.Commands;

public record CreateScannerCodeCommand(string serial) : IRequest<Guid>;