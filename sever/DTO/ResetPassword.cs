using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.DTO
{
    public class ResetPassword
    {
        [Required]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage ="Password and confirmation password do not match")]

        public  string confirmPassword { get; set; }
        [EmailAddress]
        public string Email { get; set; } = null;
        public string Token { get; set; } = null;
    }
}
