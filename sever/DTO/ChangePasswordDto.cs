using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.DTO
{
    public class ChangePasswordDto
    { 
        public string oldPassword { get; set; }
        public string newPassword { get; set; }
        [Compare("newPassword", ErrorMessage = "The new password and confirmation new password do not match.")]
        public string confirmNewPassword { get; set; }
    }
}
