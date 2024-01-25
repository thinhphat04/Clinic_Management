using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;

namespace PJ_SEM03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepo _cartRepo;

        public CartController(ICartRepo cartRepo)
        {
            this._cartRepo = cartRepo;
        }
        //
        [HttpPost]
        public async Task<IActionResult> AddCart(Cart cart)
        {
            try
            {
                if (await _cartRepo.AddCart(cart))
                {
                    return CreatedAtAction(nameof(GetCartByUserId), new { userId = cart.user_id }, "Add OK");
                }
                return BadRequest("Unable to add cart");
            }
            catch (Exception ex)
            {
                // Log the exception for debugging purposes
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCartQuantity(Cart cart)
        {
            if (await _cartRepo.UpdateCartQuantity(cart))
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCartByUserId(string userId)
        {
            return Ok(await _cartRepo.GetCartByUserId(userId));
        }

        [HttpDelete("{userId}/{productId}")]
        public async Task<IActionResult> DeleteCart(string userId, int productId)
        {
            if (await _cartRepo.DeleteCart(userId, productId))
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}