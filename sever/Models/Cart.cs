using System.ComponentModel.DataAnnotations;
using static PJ_SEM03.Models.CartItems;

namespace PJ_SEM03.Models;

public class Cart
{
    [Key]
    public int CartId { get; set; }
    public string UserId { get; set; }

    // Navigation properties
    public User User { get; set; }

    public List<CartItem> Items { get; set; } = new();

    public void AddItem(Product product, int quantity)
    {
        // Check if item already in cart or not
        var existingItem = Items.FirstOrDefault(item => item.ProductId == product.product_id);

        if (existingItem == null)
        {
            // If the item is not in the cart, add a new CartItem
            Items.Add(new CartItem { Product = product, Quantity = quantity });
        }
        else
        {
            // If the item is already in the cart, update the quantity
            existingItem.Quantity += quantity;
        }
    }


    public void RemoveItem(int productId, int quantity)
    {
        var item = Items.FirstOrDefault(item => item.ProductId == productId);
        if (item == null)
        {
            return;
        }
        item.Quantity -= quantity;

        if (item.Quantity == 0)
        {
            Items.Remove(item);
        }

    }

}