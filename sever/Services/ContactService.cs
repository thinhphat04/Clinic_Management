using Microsoft.EntityFrameworkCore;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;

namespace PJ_SEM03.Services
{
    public class ContactService : IContactRepo
    {
        private readonly DatabaseContext _databaseContext;

        public ContactService(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<Contact> CreateNew(Contact contact)
        {
            var newContact = _databaseContext.Contacts.Add(contact);
            await _databaseContext.SaveChangesAsync();
            return contact;
        }

        public async Task<IEnumerable<Contact>> GetAll()
        {
            return await _databaseContext.Contacts.ToListAsync();
        }

        public async Task<IEnumerable<Contact>> GetByType(string type)
        {
            return await _databaseContext.Contacts.Where(x =>  x.Type == type).ToListAsync();
        }
    }
}
