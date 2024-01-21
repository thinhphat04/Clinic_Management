using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PJ_SEM03.Models;

public class Feedback
{
    [Key]
    public int feedback_id { get; set; }

    public string? user_id { get; set; }

    [ForeignKey("user_id")]
    public User? User { get; set; }

    public int product_id { get; set; }

    [ForeignKey("product_id")]
    public Product? Product { get; set; }

    public string feedback_description { get; set; }

    public int feedback_rating { get; set; }
}
