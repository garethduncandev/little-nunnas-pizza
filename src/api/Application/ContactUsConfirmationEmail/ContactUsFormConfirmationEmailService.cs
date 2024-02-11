
using System.Net.Mail;
using System.Net.Mime;
using Application.ContactUsForm;
using Application.RazorViewRender;
using Application.Smtp;
using Microsoft.Extensions.Logging;

namespace Application.ContactUsConfirmationEmail;

public class ContactUsFormConfirmationEmailService(
    IAmazonSesService amazonSesService,
    IRazorViewRenderService razorViewRenderService,
    ILogger<ContactUsFormConfirmationEmailService> logger) : IContactUsFormConfirmationEmailService
{
    public async Task SendContactUsConfirmationEmailAsync(ContactUsFormModel contactUsForm,
        DateTime submittedDateTimeUtc, string senderEmailAddress, string[] replyToList)
    {
        try
        {
            var attachmentLogo = new Attachment("Images/logo-email.png", MediaTypeNames.Image.Png);
            var attachmentKart = new Attachment("Images/kart.png", MediaTypeNames.Image.Png);
            var attachmentRating = new Attachment("Images/food-hygiene-rating-5-medium.png", MediaTypeNames.Image.Png);

 
            var contactUsConfirmationEmailViewModel =
                new ContactUsFormConfirmationEmailViewModel(attachmentLogo.ContentId, attachmentKart.ContentId,
                    attachmentRating.ContentId, contactUsForm, submittedDateTimeUtc);

            var htmlBody = await razorViewRenderService.RenderViewToStringAsync(
                "EmailViews/ContactUsConfirmationEmail.cshtml", contactUsConfirmationEmailViewModel);

            var textBody = await razorViewRenderService.RenderViewToStringAsync(
                "EmailViews/ContactUsConfirmationEmailText.cshtml", contactUsConfirmationEmailViewModel);

            var emailRequest = new EmailRequest([contactUsForm.Email], senderEmailAddress, replyToList,
                               "Little Nunna's Pizza - We received your message", htmlBody, textBody,
                                              [attachmentLogo, attachmentKart, attachmentRating]);

            await amazonSesService.SendEmailAsync(emailRequest);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to send contact us confirmation email to {email}", contactUsForm.Email);
            throw;
        }
    }
}