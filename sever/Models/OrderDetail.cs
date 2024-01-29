using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.Models;

public class OrderDetail
{
    // [Key]
    // public int order_detail_id { get; set; }
    //
    public int order_id { get; set; }
    
    public int product_id { get; set; }
    
    public int product_quantity { get; set; }

    
    // public int order_quantity { get; set; } // số lượng sản phẩm
    //
    // public int order_price { get; set; } // giá sản phẩm
    
    public Order? Order { get; set; }

    public Product? Product { get; set; }
    
    
}