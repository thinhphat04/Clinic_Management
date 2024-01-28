using Microsoft.EntityFrameworkCore;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;

namespace PJ_SEM03.Services
{
    public class GiftcodeService : IGiftcode
    {
        private readonly DatabaseContext db;

        public GiftcodeService(DatabaseContext db)
        {
            this.db = db;
        }
        public async Task<GiftCode> GetGiftCodeById(int id)
        {
            return await db.GiftCodes.FindAsync(id);
        }
        
        public async Task<IEnumerable<GiftCode>> GetAllGiftCodes()
        {
            return await db.GiftCodes.ToListAsync();
        }
    }
}
