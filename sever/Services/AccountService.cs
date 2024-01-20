using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PJ_SEM03.Services
{
    public class AccountService : IAccountRepo
    {
        private readonly UserManager<User> _userManager;
        private readonly DatabaseContext _context;

        public AccountService(UserManager<User> userManager, DatabaseContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        //public async Task<UserDto> Login(LoginDto loginDto)
        //{
        //    var user = await _userManager.FindByEmailAsync(loginDto.Email);
        //    if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
        //    {
        //        return null;
        //    }
        //    return new UserDto
        //    {
        //        Email = user.Email,
        //        Token = await _tokenService.GenerateToken(user)
        //    };
        //}

        //[NonAction]
        //private string GenerateToken(UserModel user)
        //{
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        //    var claims = new[]
        //    {
        //        new Claim("Name", user.Name),
        //        new Claim("Email", user.Email),
        //        new Claim(ClaimTypes.Role, user.Role),
        //    };

        //    var token = new JwtSecurityToken(config["Jwt:Issuer"], config["Jwt:Audience"], claims, expires: DateTime.Now.AddMinutes(30), signingCredentials: credentials);
        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}

        public async Task<User> Register(RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.Username, Email = registerDto.Email, PhoneNumber = registerDto.phoneNumber };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "Member");
                return user;
            }
            return null;
        }
    }
}
