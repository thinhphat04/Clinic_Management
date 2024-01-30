using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PJ_SEM03.CustomResult;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using PJ_SEM03.RequestHelpers;
using PJ_SEM03.Services;

namespace PJ_SEM03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackRepo repo;

        public FeedbackController(IFeedbackRepo repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Feedback>>> GetAll([FromQuery] PaginationParams paginationParams)
        {
            try
            {
                return Ok(await repo.GetAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{type}")]
        public async Task<ActionResult> getFeedbackByType(string type)
        {
            try
            {                
                return Ok(await repo.GetByType(type));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("createFeedback")]
        public async Task<IActionResult> CreateFeedback(Feedback feedback)
        {
            try
            {
                return Ok(repo.CreateFeedback(feedback));
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

    }
}
