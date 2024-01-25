

namespace PJ_SEM03.Models;

public class Cart
{
    public int product_id { get; set; }

    public int product_quantity { get; set; }

    public string user_id { get; set; }

    public Product? Product { get; set; }

    public User? User { get; set; }
}