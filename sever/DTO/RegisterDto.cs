using PJ_SEM03.Models;
using PJ_SEM03.Services;
using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.DTO
{
    public class RegisterDto { 
        [Required]
        [UniqueUsername(ErrorMessage = "Username must be unique.")]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        [UniqueEmail(ErrorMessage = "Email must be unique.")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string confirmPassword { get; set; }

        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be a 10-digit number.")]
        public string phoneNumber { get; set; }
        [Required]
        public string fullname { get; set; }
        [Required]
        public string Address { get; set; }
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

    public class UniqueUsernameAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var dbContext = (DatabaseContext)validationContext.GetService(typeof(DatabaseContext));
            var username = value.ToString();
            if (dbContext.Users.Any(u => u.UserName == username))
            {
                return new ValidationResult(ErrorMessage);
            }

            return ValidationResult.Success;
        }
    }
}
