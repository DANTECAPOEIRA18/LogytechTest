using System.Text;
using MediatR;
using FluentValidation;
using BackEndScanner.Infrastructure;
using BackEndScanner.Application.Features.Scanner.Commands;
using System.Reflection;
using BackEndScanner.Application.Commons.Behaviors;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowReactApp", policy =>
        {
           policy.WithOrigins("http://localhost:5173")
           .AllowAnyHeader()
           .AllowAnyMethod(); 
        });       
    }
);

builder.Services.AddValidatorsFromAssembly(typeof(CreateScannerCodeCommand).Assembly);
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(CreateScannerCodeCommand).Assembly);
    cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
});

builder.Services.AddInfraestructure(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowReactApp");

app.MapScannerEndpoints();

app.Run();
