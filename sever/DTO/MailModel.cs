using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.DTO
{
    public class MailModel
    {
        [Required]
        [EmailAddress]
        public string ToEmail { get; set; }

        public string Subject { get; set; }
        public string Body { get; set; }

    }
}
