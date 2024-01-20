using Microsoft.AspNetCore.Identity;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;

namespace PJ_SEM03.Services
{
    public class AccountService : IAccountRepo
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly DatabaseContext _context;

        public AccountService(UserManager<User> userManager, TokenService tokenService, DatabaseContext context)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
        }

        public async Task<UserDto> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return null;
            }
            return new UserDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }

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
