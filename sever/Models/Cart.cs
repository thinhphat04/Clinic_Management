using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.Models;

public class Cart
{
    [Key]
    public int cart_id { get; set; }

    public int product_id { get; set; }

    public int product_quantity { get; set; }

    public int user_id { get; set; }

    // Navigation properties
    public Product Product { get; set; }
    public User User { get; set; }
}