namespace Application.ContactUsForm;

public interface IContactUsFormService
{
    Task SubmitContactUsAsync(ContactUsFormModel contactDetails, DateTime submittedDateTimeUtc);
}