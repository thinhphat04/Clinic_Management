using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.DTO
{
    public class UserDto
    {
        public string Id { get; set; }
        [UniqueUsername(ErrorMessage = "Username has been taken.")]
        public string? Username { get; set; }
        public string? Fullname { get; set; }
        public string? Address { get; set; }
        [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be a 10-digit number.")]
        public string? PhoneNumber { get; set; }
        public string? AvatarUrl { get; set; }
        [EmailAddress]
        [UniqueEmail(ErrorMessage = "Email has been taken.")]
        public string Email { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
    }
}
