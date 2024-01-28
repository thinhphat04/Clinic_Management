using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;

namespace PJ_SEM03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftCodeController : ControllerBase
    {
        private readonly IGiftcode repo;

        public GiftCodeController(IGiftcode repo)
        {
            this.repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GiftCode>> GetGiftCodeById(int id)
        {
            try
            {
                var giftCode = await repo.GetGiftCodeById(id);
                if (giftCode != null)
                {
                    return Ok(giftCode);
                }
                else
                {
                    return NotFound("GiftCode not found");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GiftCode>>> GetAllGiftCodes()
        {
            try
            {
                var giftCodes = await repo.GetAllGiftCodes();
                if (giftCodes != null)
                {
                    return Ok(giftCodes);
                }
                else
                {
                    return NotFound("GiftCode not found");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
