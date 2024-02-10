using Application.ContactUsConfirmationEmail;
using Application.ContactUsFormEmail;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Application.ContactUsForm;

public class ContactUsFormService(
    IConfiguration configuration,
    IContactUsFormEmailService contactUsEmailService,
    IContactUsFormConfirmationEmailService contactUsConfirmationEmailService,
    ILogger<ContactUsFormService> logger) : IContactUsFormService
{
    public async Task SubmitContactUsAsync(ContactUsFormModel contactDetails, DateTime submittedDateTimeUtc)
    {
        try
        {
            var fromEmailAddress = configuration.GetValue<string>("ContactUs:From")!;
            var toEmailAddress = configuration.GetValue<string>("ContactUs:To")!;
            await contactUsEmailService.SendContactUsEmailAsync(contactDetails, submittedDateTimeUtc, toEmailAddress, fromEmailAddress);
            await contactUsConfirmationEmailService.SendContactUsConfirmationEmailAsync(contactDetails, submittedDateTimeUtc, fromEmailAddress);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to submit contact us form");
            throw;
        }
    }
}