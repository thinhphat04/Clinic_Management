using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Services
{
    public class UserService : IUserRepo
    {
        private readonly DatabaseContext _dbContext;

        public UserService(DatabaseContext dbContext) 
        {
            _dbContext = dbContext;
        }

        public async Task<PagedList<User>> getAll(int pageNumber, int pageSize)
        {
            var query = _dbContext.Users.AsQueryable();
            var users = await PagedList<User>.ToPagedList(query, pageNumber, pageSize);
            return users;
        }

        public async Task<User> getUserById(string user_id)
        {
            return await _dbContext.Users.SingleOrDefaultAsync(u => u.Id == user_id);
        }
    }
    public async Task<bool> UpdateUser(User user)
    {
        var userToUpdate = await db.Users.FindAsync(user.user_id);
        if (userToUpdate == null)
        {
            return false;
        }
        userToUpdate.user_name = user.user_name;
        userToUpdate.user_email = user.user_email;
        userToUpdate.user_phone = user.user_phone;
        userToUpdate.user_address = user.user_address;
        userToUpdate.user_password = user.user_password;
        await db.SaveChangesAsync();
        return true;
    }
}
}
