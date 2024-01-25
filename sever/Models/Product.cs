using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.Models;

public class Product
{
    [Key]
    public int product_id { get; set; }
    
    public string product_name { get; set; }
    
    public string product_description { get; set; }
    
    public string product_type { get; set; }
    
    public string product_img { get; set; }
    
    public int product_quantity { get; set; } 
    
    public int product_price { get; set; }


    public ICollection<Cart>? Carts { get; set; }

    public ICollection<OrderDetail>? OrderDetails { get; set; }

    public ICollection<Feedback> Feedbacks { get; set; }
}