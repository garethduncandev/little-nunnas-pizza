using Application.ContactUsForm;

namespace Application.ContactUsFormEmail;

public interface IContactUsFormEmailService
{
    Task SendContactUsEmailAsync(ContactUsFormModel contactUsForm, DateTime submittedDateTimeUtc, string[] toEmailAddress, string fromEmailAddress, string[] replyToList);
}