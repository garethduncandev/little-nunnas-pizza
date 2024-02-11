using System.Net.Mail;
using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;
using MimeKit;

namespace Application.Smtp;

public class AmazonSesService(IAmazonSimpleEmailService mailService) : IAmazonSesService
{
    public async Task SendEmailAsync(EmailRequest request)
    {
        var mailMessage = new MailMessage
        {
            From = new MailAddress(request.Sender),
            Subject = request.Subject
        };

        mailMessage.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(request.HtmlBody, null, "text/html"));
        mailMessage.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(request.TextBody, null, "text/plain"));

        foreach (var recipient in request.Recipients)
        {
            mailMessage.To.Add(recipient);
        }
        foreach (var replyTo in request.ReplyToList)
        {
            mailMessage.ReplyToList.Add(replyTo);
        }

        foreach (var attachment in request.Attachments)
        {
            mailMessage.Attachments.Add(attachment);
        }

        // Convert MailMessage to MimeMessage
        var mimeMessage = MimeMessage.CreateFromMailMessage(mailMessage);

        using var memoryStream = new MemoryStream();
        await mimeMessage.WriteToAsync(memoryStream);
        memoryStream.Position = 0; // Reset the position to the start of the stream

        var rawMessage = new RawMessage(memoryStream);

        var sendEmailRequest = new SendRawEmailRequest(rawMessage);
        await mailService.SendRawEmailAsync(sendEmailRequest);
    }
}