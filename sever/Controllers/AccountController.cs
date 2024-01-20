using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using PJ_SEM03.Services;

namespace PJ_SEM03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;
        private readonly IAccountRepo repo;

        public AccountController(IAccountRepo repo, UserManager<User> _userManager, IConfiguration _config)
        {
            this.repo = repo;
            this._userManager = _userManager;
            this._config = _config;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody]LoginDto loginDto)
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
            var (success, result) = await repo.RegisterUser(registerDto);

            if (success)
            {
                return Ok(new { Success = true, User = result, Message = "Registration successful" });
            }
            else
            {
                return BadRequest(new { Success = false, Errors = result });
            }
        }
    }
}
