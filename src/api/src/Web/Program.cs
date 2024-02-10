using Amazon.Extensions.Configuration.SystemsManager;
using Application.ContactUsConfirmationEmail;
using Application.ContactUsForm;
using Application.ContactUsFormEmail;
using Application.RazorViewRender;
using Application.Smtp;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;


var builder = WebApplication.CreateBuilder(args);
var environment = builder.Environment.EnvironmentName;

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

// Add AWS Lambda support. When application is run in Lambda Kestrel is swapped out as the web server with Amazon.Lambda.AspNetCoreServer. This
// package will act as the webserver translating request and responses between the Lambda event source and ASP.NET Core.
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);

builder.Services.AddControllersWithViews();
builder.Services.AddTransient<IRazorViewRenderService, RazorViewRenderService>();
builder.Services.AddTransient<ISmtpService, SmtpService>();
builder.Services.AddTransient<IContactUsFormService, ContactUsFormService>();
builder.Services.AddTransient<IContactUsFormEmailService, ContactUsFormEmailService>();
builder.Services.AddTransient<IContactUsFormConfirmationEmailService, ContactUsFormConfirmationEmailService>();
builder.Services.AddScoped<IValidator<ContactUsFormModel>, ContactUsFormValidator>();

builder.Services.AddMvc();

builder.Configuration.AddSystemsManager(config =>
{
    config.Path = $"/littlenunnaspizza/{environment}";
    config.ReloadAfter = TimeSpan.FromMinutes(5);
    config.Optional = false;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "DevelopmentOrigins",
        policy =>
        {
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
            policy.AllowAnyOrigin();
        });

    options.AddPolicy(name: "ProductionOrigins",
    policy =>
    {
            var origins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>();
            policy.WithOrigins(origins!);
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
        });
});

builder.Configuration.WaitForSystemsManagerReloadToComplete(TimeSpan.FromSeconds(5));

// read smtp configuration from aws parameter store

var smtpConfig = new SmtpConfiguration(
       builder.Configuration.GetValue<string>("smtp:host")!,
          builder.Configuration.GetValue<int>("smtp:port"),
          builder.Configuration.GetValue<string>("smtp:username")!,
          builder.Configuration.GetValue<string>("smtp:password")!,
          true);

builder.Services.AddSingleton(smtpConfig);

builder.Services.AddSwaggerDocument(configure =>
{
    configure.Title = "Little Nunnas Pizza";
    configure.DocumentName = "little-nunnas-pizza";
});

var app = builder.Build();
app.UsePathBase(new PathString("/api"));

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi();
    app.UseCors("DevelopmentOrigins");
}
else
{
    app.UseCors("ProductionOrigins");
}

app.UseHttpsRedirection();

app.MapGet("/diagnostics", () => DateTime.UtcNow)
    .WithTags("Diagnostics")
    .Produces<DateTime>();

if (app.Environment.IsDevelopment())
{
    app.MapGet("/contact-us", async (IContactUsFormService contactUsService) =>
        await contactUsService.SubmitContactUsAsync(
            new ContactUsFormModel("Test Name", "Test Email", "123456789", DateTime.Now, new Random().Next(20, 100), "Test Message"),
            DateTime.UtcNow))
        .WithTags("ContactUs");
}

app.MapPost("/contact-us", async ([FromServices] IContactUsFormService contactUsService, [FromBody]ContactUsFormModel contactUsForm) =>
    await contactUsService.SubmitContactUsAsync(contactUsForm, DateTime.UtcNow))
    .WithTags("ContactUs");

app.Run();


//static AWSCredentials LoadSsoCredentials(string profile)
//{
//    var chain = new CredentialProfileStoreChain();
//    if (!chain.TryGetAWSCredentials(profile, out var credentials))
//        throw new Exception($"Failed to find the {profile} profile");

//    var ssoCredentials = credentials as SSOAWSCredentials;

//    ssoCredentials.Options.ClientName = "Example-SSO-App";
//    ssoCredentials.Options.SsoVerificationCallback = args =>
//    {
//        // Launch a browser window that prompts the SSO user to complete an SSO login.
//        //  This method is only invoked if the session doesn't already have a valid SSO token.
//        // NOTE: Process.Start might not support launching a browser on macOS or Linux. If not,
//        //       use an appropriate mechanism on those systems instead.
//        Process.Start(new ProcessStartInfo
//        {
//            FileName = args.VerificationUriComplete,
//            UseShellExecute = true
//        });
//    };

//    return ssoCredentials;
//}