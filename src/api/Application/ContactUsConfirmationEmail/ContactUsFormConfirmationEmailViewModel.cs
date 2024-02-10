using Application.ContactUsForm;

namespace Application.ContactUsConfirmationEmail;

public record ContactUsFormConfirmationEmailViewModel(string LogoCid, string KartImageCid, string FoodHygieneRatingCid, ContactUsFormModel ContactUsForm, DateTime DateTimeSubmittedUtc);