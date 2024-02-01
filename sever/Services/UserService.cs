using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
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
        CloudinaryService _cloudinaryService;

        public UserService(DatabaseContext dbContext, CloudinaryService cloudinaryService) 
        {
            _dbContext = dbContext;
            _cloudinaryService = cloudinaryService;
          
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

        public async Task<(bool Success, object Result)> UpdateUser(UserWithImageDto user)
        {
            try
            {
                var existingUserWithEmail = await _dbContext.Users.SingleOrDefaultAsync(x => x.Email == user.Email && x.Id != user.Id);
                var existingUserWithUsername = await _dbContext.Users.SingleOrDefaultAsync(x => x.UserName == user.Username && x.Id != user.Id);

                if (existingUserWithEmail == null && existingUserWithUsername == null)
                {
                    var query = await _dbContext.Users.SingleOrDefaultAsync(x => x.Id == user.Id);

                    

                        // Update other user information
                        query.UserName = user.Username;
                        query.user_fullName = user.Fullname;
                        query.Email = user.Email;
                        query.user_address = user.Address;
                        query.PhoneNumber = user.PhoneNumber;

                    // Update the user's avatar using Cloudinary
                    if (user.Image != null)
                    {
                        CloudinaryService cloud = new CloudinaryService();
                        string avatarUrl = cloud.UploadImage(user.Image);
                        query.AvatarUrl = avatarUrl;
                    }

                    _dbContext.Users.Update(query);
                        await _dbContext.SaveChangesAsync();

                        return (true, query);
                    }
                
                else
                {
                    if (existingUserWithEmail != null)
                    {
                        return (false, $"Duplicate email: '{user.Email}'");
                    }

                    if (existingUserWithUsername != null)
                    {
                        return (false, $"Duplicate username: '{user.Username}'");
                    }

                    return (false, null);
                }

                return (false, null);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return (false, null);
            }

        }



    }
}



