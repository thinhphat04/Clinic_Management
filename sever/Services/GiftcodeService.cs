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

        public async Task<IEnumerable<GiftCode>> GetGiftCodes()
        {
            try
            {
                var allCodes = await db.GiftCodes.ToListAsync();
                return allCodes;
            }
            catch (Exception ex)
            {
                throw;
            }

        }
    }
}
