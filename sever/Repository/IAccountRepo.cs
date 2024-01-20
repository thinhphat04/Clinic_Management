using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;

namespace PJ_SEM03.Repository
{
    public interface IAccountRepo
    {
        Task<UserDto> Login(LoginDto loginDto);
        Task<User> Register(RegisterDto registerDto);
    }
}
