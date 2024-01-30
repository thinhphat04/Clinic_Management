using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.Models
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Fullname { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }

    }
}
