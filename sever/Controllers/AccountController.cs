
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using PJ_SEM03.Services;
using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;
        private readonly IAccountRepo repo;

        public AccountController(IAccountRepo repo, UserManager<User> _userManager, IConfiguration _config
            )
        {
            this.repo = repo;
            this._userManager = _userManager;
            this._config = _config;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var result = await repo.Login(loginDto);
                if (result != null)
                {
                    return Ok(result);
                }
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                var result = await repo.RegisterUser(registerDto);

                if (result.Success)
                {
                    return Ok(result.Result); // Successful registration
                }
                else
                {
                    return BadRequest(result.Result); // Registration failed with errors
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpPut("ChangePassword/{userId}")]
        public async Task<IActionResult> ChangePassword(string userId, [FromBody] ChangePasswordDto changePasswordDto)
        {
            try
            {
                var result = await repo.changePassword(userId, changePasswordDto);

                if (result.Success)
                {
                    return Ok(result.Result);
                }
                else
                {
                    return BadRequest(result.Result);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

    }
}