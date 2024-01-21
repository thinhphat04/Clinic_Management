using PJ_SEM03.Models;

namespace PJ_SEM03.Repository;

public interface ICartRepo
{
    Task<bool> AddCart(Cart cart);
    Task<bool> UpdateCartQuantity(Cart cart);
    Task<IEnumerable<Cart>> GetCartByUserId(string userId);
    Task<bool> DeleteCart(string userId, int productId);
}