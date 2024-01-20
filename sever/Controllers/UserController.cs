using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using PJ_SEM03.RequestHelpers;
using PJ_SEM03.Services;

namespace PJ_SEM03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo userRepo;
        public UserController(IUserRepo userRepo)
        {
            this.userRepo = userRepo;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<User>>> GetAll([FromQuery] PaginationParams paginationParams)
        {
            try
            {
                return Ok(await userRepo.getAll(paginationParams.PageNumber, paginationParams.PageSize));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        
        [HttpPut]
        public async Task<IActionResult> UpdateUser(User user)
        {
            var result = await userRepo.UpdateUser(user);
            if (result)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("{user_id}")]
        public async Task<ActionResult<User>> getUserById(string user_id)
        {
            try
            {
                return Ok(await userRepo.getUserById(user_id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }
}
