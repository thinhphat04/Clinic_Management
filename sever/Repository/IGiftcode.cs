using PJ_SEM03.Models;

namespace PJ_SEM03.Repository
{
    public interface IGiftcode
    {
        Task<GiftCode> GetGiftCodeById(int id);
        
        Task<IEnumerable<GiftCode>> GetAllGiftCodes();

    }
}
