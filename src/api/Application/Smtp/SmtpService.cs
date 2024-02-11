using System.Net.Mail;
using System.Net;
using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;

namespace Application.Smtp;

public class SmtpService(SmtpConfiguration smtpConfiguration, IAmazonSimpleEmailService mailService) : ISmtpService
{
    public async Task SendEmailAsync(string toEmailAddress, string fromEmailAddress, string subject, string htmlBody,
        string textBody,
        Attachment[] attachments)
    {
        var mailBody = new Body
        {
            Html = new Content(htmlBody),
            Text = new Content(textBody)
        };

        var message = new Message(new Content(subject), mailBody);
        var destination = new Destination([toEmailAddress]);
        var request = new SendEmailRequest(fromEmailAddress, destination, message);

        await mailService.SendEmailAsync(request);

        //var client = new SmtpClient
        //{
        //    Host = smtpConfiguration.Host,
        //    Port = smtpConfiguration.Port,
        //    EnableSsl = smtpConfiguration.EnableSsl,
        //    Credentials = new NetworkCredential(smtpConfiguration.Username, smtpConfiguration.Password)
        //};

        //var mailMessage = new MailMessage
        //{
        //    From = new MailAddress(fromEmailAddress),
        //    Subject = subject,
        //    Body = message,
        //    IsBodyHtml = isBodyHtml
        //};

        //mailMessage.To.Add(toEmailAddress);


        //foreach (var attachment in attachments)
        //{
        //    mailMessage.Attachments.Add(attachment);
        //}

        //await client.SendMailAsync(mailMessage);
    }
}