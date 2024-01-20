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
                var user = new User
                {
                    UserName = "member",
                    Email = "member@test.com"
                };
                user.Id = "123";
                await userManager.CreateAsync(user, "Pass12.");
                await userManager.AddToRoleAsync(user, "Member");

                var user1 = new User
                {
                    UserName = "member1",
                    Email = "member@test.com"
                };
                user1.Id = "1234";
                await userManager.CreateAsync(user1, "Pass12.");
                await userManager.AddToRoleAsync(user1, "Member");

                var user2 = new User
                {
                    UserName = "member2",
                    Email = "member@test.com"
                };
                user.Id = "12345";
                await userManager.CreateAsync(user2, "Pass12.");
                await userManager.AddToRoleAsync(user2, "Member");


                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pass12.");
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
            }

            context.SaveChanges();
        }
    }
}