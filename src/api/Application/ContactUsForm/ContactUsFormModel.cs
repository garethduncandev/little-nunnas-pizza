using FluentValidation;

namespace Application.ContactUsForm;

public record ContactUsFormModel(string Name, string Email, string? PhoneNumber, DateTime EventDate, int PartySize, string Message);

public class ContactUsFormValidator : AbstractValidator<ContactUsFormModel>
{
    public ContactUsFormValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("Name is required");
        RuleFor(x => x.Email).NotEmpty().WithMessage("Email is required").EmailAddress()
            .WithMessage("Invalid email address");
        RuleFor(x => x.EventDate).NotEmpty().WithMessage("Event date is required").GreaterThan(DateTime.UtcNow)
            .WithMessage("Event date must be in the future");
        RuleFor(x => x.PartySize).NotEmpty().WithMessage("Number of people to feed required").GreaterThanOrEqualTo(20)
            .LessThanOrEqualTo(1000).WithMessage("Number of people must be 20 or more");
        RuleFor(x => x.Message).NotEmpty().Length(1, 500).WithMessage("Message is required");
    }
}