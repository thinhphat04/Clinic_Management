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
            if (oldCart == null)
            {
                db.Carts.Add(cart);
                var result = await db.SaveChangesAsync();
                if (result == 1)
                {
                    return true;
                }
                return false;
            }
            oldCart.product_quantity += cart.product_quantity;
            return await UpdateCartQuantity(oldCart);
        }

        public async Task<bool> UpdateCartQuantity(Cart cart)
        {
            try
            {
                var existingCart = await db.Carts.SingleOrDefaultAsync(c => c.user_id == cart.user_id && c.product_id == cart.product_id);

                if (existingCart != null)
                {
                    existingCart.product_quantity = cart.product_quantity;
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
            var cartItem = await db.Carts.FirstOrDefaultAsync(c => c.product_id == productId && c.user_id == userId);
            if (cartItem != null)
            {
                db.Carts.Remove(cartItem);
                return await db.SaveChangesAsync() > 0;
            }
            return false;
        }

    }
}