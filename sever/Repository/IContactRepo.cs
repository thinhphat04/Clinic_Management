using PJ_SEM03.Models;

namespace PJ_SEM03.Repository
{
    public interface IContactRepo
    {
        Task<IEnumerable<Contact>> GetAll();
        Task<IEnumerable<Contact>> GetByType(string type);
        Task<Contact> CreateNew(Contact contact);
    }
}
