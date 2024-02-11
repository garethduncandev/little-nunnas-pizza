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
            var senderEmailAddress = configuration.GetValue<string>("ContactUs:From")!;
            var toEmailAddressesParamValue = configuration.GetValue<string>("ContactUs:To")!;
            var toEmailAddresses = toEmailAddressesParamValue.Split(',');

            var replyTo = contactDetails.Email;
            await contactUsEmailService.SendContactUsEmailAsync(contactDetails, submittedDateTimeUtc, toEmailAddresses, senderEmailAddress, [replyTo]);

            var replyTos = configuration.GetValue<string>("ContactUs:ReplyTo")!;
            var replyToList = replyTos.Split(',');
            await contactUsConfirmationEmailService.SendContactUsConfirmationEmailAsync(contactDetails, submittedDateTimeUtc, senderEmailAddress, replyToList);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to submit contact us form");
            throw;
        }
    }
}