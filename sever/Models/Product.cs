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
    
    public int product_percent { get; set; }
    
    [Range(1,5)]
    public int product_star { get; set; }
    public int? GiftCodeId { get; set; }  
    public GiftCode? GiftCode { get; set; }  

    public ICollection<Cart>? Carts { get; set; }

    public ICollection<OrderDetail>? OrderDetails { get; set; }

}