using Application.ContactUsForm;

namespace Application.ContactUsConfirmationEmail;

public interface IContactUsFormConfirmationEmailService
{
    Task SendContactUsConfirmationEmailAsync(ContactUsFormModel contactDetails, DateTime submittedDateTimeUtc, string senderEmailAddress, string[] replyToList);
}