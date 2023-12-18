using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

//builder.Services.AddSwaggerGen();

// Add AWS Lambda support. When application is run in Lambda Kestrel is swapped out as the web server with Amazon.Lambda.AspNetCoreServer. This
// package will act as the webserver translating request and responses between the Lambda event source and ASP.NET Core.
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);

builder.Services.AddSwaggerDocument(configure =>
{
    configure.Title = "Little Nunnas Pizza";
    configure.Version = "1";
    configure.DocumentName = "v1";
    //configure.ApiGroupNames = new[] { "v1" };
});

var app = builder.Build();
app.UsePathBase(new PathString("/api"));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

}

app.UseOpenApi();
app.UseSwaggerUi();

app.UseHttpsRedirection();

app.MapGet("/diagnostics", () => DateTime.UtcNow)
    .WithTags("Diagnostics")
    .Produces<DateTime>();

app.Run();


