using Application.ContactUsForm;

namespace Application.ContactUsFormEmail;

public record ContactUsFormEmailViewModel(string LogoCid, ContactUsFormModel ContactUsForm, DateTime SubmittedDateTime);