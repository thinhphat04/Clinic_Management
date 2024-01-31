using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.Models
{
    public class Feedback
    {
        [Key]
        public int feedback_id { get; set; }
        public string user_id { get; set; }
        public int product_id { get; set; }
        public string feedback_description { get; set; }
        public int feedback_rating { get; set; }
        public User? user { get; set; }
        public Product? product { get; set; }
    }
}
