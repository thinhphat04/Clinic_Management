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
            if (await _cartRepo.AddCart(cart))
            {
                return Ok("success");
            }

            return BadRequest("The quantity in the cart cannot exceed the available product quantity");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCartQuantity(Cart cart)
        {
            if (await _cartRepo.UpdateCartQuantity(cart))
            {
                return Ok("success");
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
                return Ok("success");
            }
            return BadRequest();
        }
        
        [HttpPut("decrease")]
        public async Task<IActionResult> DecreaseCartQuantity(string userId, int productId)
        {
            if (await _cartRepo.DecreaseCartQuantity(userId, productId))
            {
                return Ok("success");
            }
            return BadRequest();
        }
    }
}