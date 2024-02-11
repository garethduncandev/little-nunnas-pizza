using System.Net.Mail;

namespace Application.Smtp;

public record EmailRequest(
    string[] Recipients,
    string Sender,
    string[] ReplyToList,
    string Subject,
    string HtmlBody,
    string TextBody,
    Attachment[] Attachments);