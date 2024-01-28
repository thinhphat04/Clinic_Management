using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;

namespace PJ_SEM03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GitfcodeController : ControllerBase
    {
        private readonly IGiftcode repo;

        public GitfcodeController(IGiftcode repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GiftCode>>> getAllGiftcode()
        {
            try
            {
                var result = repo.GetGiftCodes();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
