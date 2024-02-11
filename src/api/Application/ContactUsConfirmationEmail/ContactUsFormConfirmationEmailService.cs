using System.Net.Mail;
using Application.ContactUsForm;
using Application.RazorViewRender;
using Application.Smtp;
using Microsoft.Extensions.Logging;

namespace Application.ContactUsConfirmationEmail;

public class ContactUsFormConfirmationEmailService(
    ISmtpService smtpService,
    IRazorViewRenderService razorViewRenderService,
    ILogger<ContactUsFormConfirmationEmailService> logger) : IContactUsFormConfirmationEmailService
{
    public async Task SendContactUsConfirmationEmailAsync(ContactUsFormModel contactUsForm,
        DateTime submittedDateTimeUtc, string fromEmailAddress)
    {
        try
        {
            var attachmentLogo = new Attachment("Images/logo-email.png");
            var attachmentKart = new Attachment("Images/kart.png");
            var attachmentRating = new Attachment("Images/food-hygiene-rating-5-medium.png");

            var contactUsConfirmationEmailViewModel =
                new ContactUsFormConfirmationEmailViewModel(attachmentLogo.ContentId, attachmentKart.ContentId,
                    attachmentRating.ContentId, contactUsForm, submittedDateTimeUtc);

            var htmlBody = await razorViewRenderService.RenderViewToStringAsync(
                "EmailViews/ContactUsConfirmationEmail.cshtml", contactUsConfirmationEmailViewModel);

            var textBody = await razorViewRenderService.RenderViewToStringAsync(
                "EmailViews/ContactUsConfirmationEmailText.cshtml", contactUsConfirmationEmailViewModel);

            await smtpService.SendEmailAsync(contactUsForm.Email, fromEmailAddress,
                "Little Nunna's Pizza - We received your message", htmlBody, textBody,
                [attachmentLogo, attachmentKart, attachmentRating]);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to send contact us confirmation email to {email}", contactUsForm.Email);
            throw;
        }
    }
}