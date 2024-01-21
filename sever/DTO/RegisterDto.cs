using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.DTO
{
    public class RegisterDto : LoginDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string confirmPassword { get; set; }
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be a 10-digit number.")]
        public string phoneNumber { get; set; }
        public string Address { get; set; }
    }
}
