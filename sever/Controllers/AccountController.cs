
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

        //[HttpPost("forgotpassword")]
        //public async Task<IActionResult> ForgotPassword([FromBody] string Email)
        //{
        //    try
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            var user = await _userManager.FindByEmailAsync(Email);

        //            if (user != null)
        //            {
        //                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        //                var resetPasswordLink = Url.Action(nameof(ResetPassword), "Account", new { userId = user.Email, token }, protocol: HttpContext.Request.Scheme);

        //                var message = new Message(new string[] { user.Email! }, "ForgotPasswordLink", resetPasswordLink);
        //                _emailService.SendEmail(message);

        //                return Ok("Password reset link sent successfully.");
        //            }
        //            else
        //            {
        //                return BadRequest("User with the given email address not found.");
        //            }
        //        }
        //        else
        //        {
        //            return BadRequest("Invalid data.");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        //[HttpGet("reset-password")]
        //public async Task<IActionResult> ResetPassword(string token, string email)
        //{
        //    var model = new ResetPassword { Token = token, Email = email };
        //    return Ok(new { model });
        //}

        //[HttpPost("reset-password")]
        //public async Task<IActionResult> ResetPassword(ResetPassword resetPassword)
        //{
        //    var user = await _userManager.FindByEmailAsync(resetPassword.Email);
        //    if (user != null)
        //    {
        //        var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPassword.Token, resetPassword.Password);
        //        if (!resetPassResult.Succeeded)
        //        {
        //            foreach (var error in resetPassResult.Errors)
        //            {
        //                ModelState.AddModelError(error.Code, error.Description);
        //            }
        //            return Ok(ModelState);
        //        }
        //        return Ok("Password has been changed");
        //    }
        //    return BadRequest("Can not send email, please try again");
        //}

       
    }
}