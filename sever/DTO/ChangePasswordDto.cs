using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.DTO
{
    public class ChangePasswordDto
    {
        [Required]       
        public string oldPassword { get; set; }
        [Required]
        public string newPassword { get; set; }
        [Required]
        [Compare("newPassword", ErrorMessage = "The new password and confirmation new password do not match.")]
        public string confirmNewPassword { get; set; }
    }
}
