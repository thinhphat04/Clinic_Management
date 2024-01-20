using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PJ_SEM03.CustomResult;
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
                return Ok(await repo.getAll(paginationParams.PageNumber, paginationParams.PageSize));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{product_id}")]
        public async Task<ActionResult> getFeedbackByProductId(int product_id, [FromQuery] PaginationParams paginationParams)
        {
            try
            {                
                return Ok(await repo.getFeedbackByProductId(product_id, paginationParams.PageNumber, paginationParams.PageSize));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}
