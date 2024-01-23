using PJ_SEM03.Models;
using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.DTO
{
    public class LoginDto
    {

        public string userName { get; set; }

        [Required]
        public string Password { get; set; }
    }
    
}