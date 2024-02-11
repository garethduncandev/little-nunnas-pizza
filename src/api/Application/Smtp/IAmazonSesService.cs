using System.Net.Mail;

namespace Application.Smtp;

public interface IAmazonSesService
{
    Task SendEmailAsync(EmailRequest request);
}