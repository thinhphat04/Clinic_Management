using PJ_SEM03.Models;
using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.DTO
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        [UniqueEmail(ErrorMessage = "Email must be unique.")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class UniqueEmailAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var dbContext = (DatabaseContext)validationContext.GetService(typeof(DatabaseContext));
            var email = value.ToString();

            if (dbContext.Users.Any(u => u.Email == email))
            {
                return new ValidationResult(ErrorMessage);
            }

            return ValidationResult.Success;
        }
    }
}