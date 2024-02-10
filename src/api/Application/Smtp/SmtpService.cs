using System.Net.Mail;
using System.Net;
namespace Application.Smtp;

public class SmtpService(SmtpConfiguration smtpConfiguration) : ISmtpService
{
    public async Task SendEmailAsync(string toEmailAddress, string fromEmailAddress, string subject, string message,
        bool isBodyHtml, Attachment[] attachments)
    {
        var client = new SmtpClient
        {
            Host = smtpConfiguration.Host,
            Port = smtpConfiguration.Port,
            EnableSsl = smtpConfiguration.EnableSsl,
            Credentials = new NetworkCredential(smtpConfiguration.Username, smtpConfiguration.Password)
        };

        var mailMessage = new MailMessage
        {
            From = new MailAddress(fromEmailAddress),
            Subject = subject,
            Body = message,
            IsBodyHtml = isBodyHtml
        };

        mailMessage.To.Add(toEmailAddress);


        foreach (var attachment in attachments)
        {
            mailMessage.Attachments.Add(attachment);
        }

        await client.SendMailAsync(mailMessage);
    }
}