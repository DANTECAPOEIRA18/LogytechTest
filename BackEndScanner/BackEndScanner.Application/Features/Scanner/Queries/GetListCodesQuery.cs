using MediatR;

namespace BackEndScanner.Application.Features.Scanner.Queries;

public record GetListCodesQuery() : IRequest<List<string>>;