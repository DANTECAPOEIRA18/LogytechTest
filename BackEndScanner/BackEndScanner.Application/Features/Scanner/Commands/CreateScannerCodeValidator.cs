using FluentValidation;

namespace BackEndScanner.Application.Features.Scanner.Commands;

public class CreateScannerCodeValidator : AbstractValidator<CreateScannerCodeCommand>
{
    public CreateScannerCodeValidator()
    {
        RuleFor(p => p.serial)
            .NotEmpty().WithMessage("El Serial no puede ser un valor vacío")
            .NotNull()
            .Matches(@"^[a-zA-Z0-9]+$").WithMessage("El codigo solo debe contener números y letras.")
            .MinimumLength(8).WithMessage("El codigo es demasiado corto")
            .MaximumLength(14).WithMessage("El codigo no puede superar los 14 caracteres");
    }
}