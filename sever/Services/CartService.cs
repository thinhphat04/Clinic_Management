using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace PJ_SEM03.Services
{
    public class CartService : ICartRepo
    {
        private readonly DatabaseContext db;

        public CartService(DatabaseContext db)
        {
            this.db = db;
        }

        public async Task<bool> AddCart(Cart cart)
        {
            var oldCart = await db.Carts.SingleOrDefaultAsync(c => c.user_id == cart.user_id && c.product_id == cart.product_id);
            var product = await db.Products.SingleOrDefaultAsync(p => p.product_id == cart.product_id);

            if (oldCart == null)
            {
                if (cart.product_quantity > product.product_quantity)
                {
                    throw new Exception("The quantity in the cart cannot exceed the available product quantity.");
                }

                db.Carts.Add(cart);
                var result = await db.SaveChangesAsync();
                if (result == 1)
                {
                    return true;
                }
                return false;
            }

            if (oldCart.product_quantity + cart.product_quantity > product.product_quantity)
            {
                throw new Exception("The quantity in the cart cannot exceed the available product quantity.");
            }

            oldCart.product_quantity += cart.product_quantity;
            return await UpdateCartQuantity(oldCart);
        }

        public async Task<bool> DecreaseCartQuantity(string userId, int productId)
        {
            var cart = await db.Carts.SingleOrDefaultAsync(c => c.user_id == userId && c.product_id == productId);
            if (cart != null)
            {
                if (cart.product_quantity > 1)
                {
                    cart.product_quantity -= 1;
                    db.Carts.Update(cart);
                    await db.SaveChangesAsync();
                    return true;
                }
                else
                {
                    db.Carts.Remove(cart);
                    await db.SaveChangesAsync();
                    return true;
                }
            }

            return false;
        }
        
        public async Task<bool> UpdateCartQuantity(Cart newCart)
        {
            try
            {
                var existingCart = await db.Carts.SingleOrDefaultAsync(c => c.user_id == newCart.user_id && c.product_id == newCart.product_id);

                if (existingCart != null)
                {
                    existingCart.product_quantity = newCart.product_quantity;
                    db.Carts.Update(existingCart);
                    await db.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                // You can log ex.Message or other relevant information
                return false;
            }
        }

        public async Task<IEnumerable<Cart>> GetCartByUserId(string userId)
        {
            return await db.Carts.Include(c => c.Product).Where(c => c.user_id == userId).ToListAsync();
        }
        
        
        public async Task<bool> DeleteCart(string userId, int productId)
        {
            var cart = await db.Carts.SingleOrDefaultAsync(c => c.user_id == userId && c.product_id == productId);
            if (cart != null)
            {
                db.Carts.Remove(cart);
                await db.SaveChangesAsync();
                return true;
            }

            return false;
        }
        
        public async Task<bool> ClearCart(string userId)
        {
            var cartItems = await db.Carts.Where(c => c.user_id == userId).ToListAsync();
            if (cartItems != null)
            {
                db.Carts.RemoveRange(cartItems);
                await db.SaveChangesAsync();
                return true;
            }

            return false;
        }
        
    }
}