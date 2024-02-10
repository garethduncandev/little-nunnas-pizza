﻿using System.Net.Mail;
using Application.ContactUsForm;
using Application.RazorViewRender;
using Application.Smtp;
using Microsoft.Extensions.Logging;

namespace Application.ContactUsFormEmail;

public class ContactUsFormEmailService(
    ISmtpService smtpService,
    IRazorViewRenderService razorViewRenderService,
    ILogger<ContactUsFormEmailService> logger) : IContactUsFormEmailService
{
    public async Task SendContactUsEmailAsync(ContactUsFormModel contactUsForm, DateTime submittedDateTimeUtc,
        string toEmailAddress, string fromEmailAddress)
    {
        try
        {
            var attachment = new Attachment("Images/logo-email.png");

            var contactUsModel =
                new ContactUsFormEmailViewModel(attachment.ContentId, contactUsForm, submittedDateTimeUtc);

            var body = await razorViewRenderService.RenderViewToStringAsync("EmailViews/ContactUsEmail.cshtml",
                contactUsModel);

            await smtpService.SendEmailAsync(toEmailAddress, fromEmailAddress, "New Contact Us Message", body, true,
                [attachment]);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to send contact us email to {toEmailAddress}", toEmailAddress);
            throw;
        }
    }
}