using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Policy;
using System.Text;

namespace PJ_SEM03.Services
{
    public class AccountService : IAccountRepo
    {
        private readonly UserManager<User> _userManager;
        private readonly DatabaseContext _context;
        private readonly IConfiguration _config;
        //private readonly EmailService _emailService;

        public AccountService(UserManager<User> userManager, DatabaseContext context, IConfiguration config
            //,EmailService emailService
            )
        {
            _userManager = userManager;
            _context = context;
            _config = config;
            //_emailService = emailService;
        }

        public async Task<UserDto> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.userName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return null;
            }
            return new UserDto
            {
                Id = user.Id,
                Role = user.Role,
                Fullname = user.user_fullName,
                Address = user.user_address,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
                Username = user.UserName,
                AvatarUrl = user.AvatarUrl,
                Token = GenerateToken(user)
            };
        }

        [NonAction]
        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim("Name", user.UserName),
                new Claim("Email", user.Email),
                new Claim(ClaimTypes.Role, user.Role),
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], claims, expires: DateTime.Now.AddHours(3), signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<(bool Success, object Result)> RegisterUser(RegisterDto registerDto)
        {
            // Check if a user with the same username already exists
            var existingUserWithUsername = await _userManager.FindByNameAsync(registerDto.Username);
            if (existingUserWithUsername != null)
            {
                var error = "Username is already taken.";
                return (false, error);
            }

            // Check if a user with the same email already exists
            var existingUserWithEmail = await _userManager.FindByEmailAsync(registerDto.Email);
            if (existingUserWithEmail != null)
            {
                var error = "Email address is already registered.";
                return (false, error);
            }

            var user = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
                PhoneNumber = registerDto.phoneNumber,
                Role = "Member",
                user_address = registerDto.Address,
                user_fullName = registerDto.fullname,
                AvatarUrl = "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk"
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                var userDto = new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    user.PhoneNumber,
                    user.user_address,
                    user.user_fullName,
                    user.AvatarUrl                  
                };

                return (true, userDto);
            }
            else
            {
                var errors = result.Errors.Select(e => e.Description).ToList();
                return (false, errors);
            }
        }

    }
}
