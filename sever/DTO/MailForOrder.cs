using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.DTO
{
    public class MailForOrder
    {
        [Required]
        [EmailAddress]
        public string ToEmail { get; set; }
        public string? Subject { get; set; }
        public string? PhoneNumber { get; set; }
        public string? OrderCode { get; set; }
        public float? totalPrice { get; set; }
    }
}
