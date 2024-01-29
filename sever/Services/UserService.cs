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

        public async Task<PagedList<User>> getUserByRole(string user_Role, int pageNumber, int pageSize)
        {
            var query = _dbContext.Users.Where(x => x.Role.ToLower() == user_Role.ToLower()).AsQueryable();
            var users = await PagedList<User>.ToPagedList(query, pageNumber, pageSize);
            return users;
        }

        public async Task<bool> UpdateUser(UserDto user)
        {
            try
            {
                var query = await _dbContext.Users.SingleOrDefaultAsync(x => x.Id == user.Id);

                if (query != null)
                {
                    query.UserName = user.Username;
                    query.user_fullName = user.Fullname;
                    query.user_address = user.Address;
                    query.PhoneNumber = user.PhoneNumber;

                    _dbContext.Users.Update(query);
                    await _dbContext.SaveChangesAsync(); // Use SaveChangesAsync instead of SaveChanges
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }

}

