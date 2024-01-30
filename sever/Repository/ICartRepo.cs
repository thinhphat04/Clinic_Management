using PJ_SEM03.DTO;
using PJ_SEM03.Models;

namespace PJ_SEM03.Repository;

public interface ICartRepo
{
    Task<bool> AddCart(Cart cart);
    Task<bool> UpdateCartQuantity(Cart cart);
    Task<bool> DeleteCart(string userId, int productId);
    Task<IEnumerable<Cart>> GetCartByUserId(string userId);
    Task<bool> DecreaseCartQuantity(string userId, int productId);

}
