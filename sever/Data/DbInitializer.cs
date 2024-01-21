using Microsoft.AspNetCore.Identity;
using PJ_SEM03.Models;

namespace PJ_SEM03.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(DatabaseContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<User>()
                    {
                     new User
                    {
                        Id = "1",
                        UserName = "admin",
                        Email = "admin@test.com",
                        Role = "Admin"
                    },
                    new User
                    {
                        Id ="2",
                        UserName = "phuc",
                        Email = "phuc@test.com",
                        Role = "Member"
                    },
                    new User
                    {
                        Id ="3",
                        UserName = "loc",
                        Email = "loc@test.com",
                        Role = "Member"
                    },
                    new User
                    {
                        Id ="4",
                        UserName = "tho",
                        Email = "tho@test.com",
                        Role = "Member"
                    },
                   
                };
                foreach (var user in users)
                {
                    var result = await userManager.CreateAsync(user, "Pa$$w0rd");
                }
                context.SaveChanges();
            }
        }
    }
}