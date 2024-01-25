using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Azure.Core;
using PJ_SEM03.DTO;

namespace PJ_SEM03.Services
{
    public class CartService : ICartRepo
    {
        private readonly DatabaseContext db;

        public CartService(DatabaseContext db)
        {
            this.db = db;
        }

        //public async Task<bool> AddCart(Cart cart)
        //{
        //    //var oldCart = await db.Carts.SingleOrDefaultAsync(c => c.user_id == cart.user_id && c.product_id == cart.product_id);
        //    //if (oldCart == null)
        //    //{
        //    //    db.Carts.Add(cart);
        //    //    var result = await db.SaveChangesAsync();
        //    //    if (result == 1)
        //    //    {
        //    //        return true;
        //    //    }
        //    //    return false;
        //    //}
        //    //oldCart.product_quantity += cart.product_quantity;
        //    //return await UpdateCartQuantity(oldCart);
        //    return true;
        //}

        //public async Task<bool> UpdateCartQuantity(Cart cart)
        //{
        //    //try
        //    //{
        //    //    var existingCart = await db.Carts.SingleOrDefaultAsync(c => c.user_id == cart.user_id && c.product_id == cart.product_id);

        //    //    if (existingCart != null)
        //    //    {
        //    //        existingCart.product_quantity = cart.product_quantity;
        //    //        await db.SaveChangesAsync();
        //    //        return true;
        //    //    }

        //    //    return false;
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    Log the exception for debugging purposes

        //    //    You can log ex.Message or other relevant information
        //    //    return false;
        //    //}
        //    return true;
        //}

        public async Task<IEnumerable<Cart>> GetCartByUserId(string userId)
        {
            return await db.Carts
       .Include(c => c.Items)  // Include the related CartItems
       .Where(c => c.UserId == userId)
       .ToListAsync();
        }

        public async Task<bool> DeleteCart(string userId, int productId)
        {
            //var cartItem = await db.Carts.FirstOrDefaultAsync(c => c.product_id == productId && c.user_id == userId);
            //if (cartItem != null)
            //{
            //    db.Carts.Remove(cartItem);
            //    return await db.SaveChangesAsync() > 0;
            //}
            return false;
        }

        public async Task<Cart?> RetrieveCart(string userId)
        {
            var cart = await db.Carts
                                .Include(ci => ci.Items)
                                .ThenInclude(p => p.Product)
                                .FirstOrDefaultAsync(x => x.UserId == userId);

            if (cart != null && cart.Items == null)
            {
                cart.Items = new List<CartItem>();
            }

            return cart;
        }


        public Cart? CreateCart(string user_id)
        {
            var cart = new Cart { UserId = user_id };

            // Start tracking entity that added
            db.Carts.Add(cart);
            return cart;
        }

        public CartDto MapCartToDto(Cart? cart)
        {
            return new CartDto
            {
                Id = cart.CartId,
                user_Id = cart.UserId,
                Items = cart.Items.Select(item => new CartItemDto
                {
                    product_id = item.ProductId,
                    product_quantity = item.Quantity,
                    product_name = item.Product.product_name,
                    product_type = item.Product.product_type,
                    product_img = item.Product.product_img,
                    product_price = item.Product.product_price,
                }).ToList(),
            };
        }

    }
}