using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;

namespace PJ_SEM03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepo _cartRepo;
        private readonly DatabaseContext db;

        public CartController(ICartRepo cartRepo, DatabaseContext database)
        {
            this._cartRepo = cartRepo;
            this.db = database;
        }


        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDto>> GetCart(string userId)
        {
            var cart = await RetrieveCart(userId);

            if (cart == null)
            {
                return NotFound();
            }
            return MapCartToDto(cart);
        }


        [HttpPost]
        public async Task<ActionResult<CartDto>> AddItemToCart(int productId, int quantity, string userId)
        {
            try
            {

                // Get Cart || Create Cart
                var cart = await RetrieveCart(userId);
                if (cart == null)
                {
                    cart = await CreateCart(userId);
                }

                // Get Product
                Product product = await db.Products.FindAsync(productId);
                if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

                // Add Item
                var existingItem = cart.Items.FirstOrDefault(item => item.ProductId == product.product_id);

                if (existingItem == null)
                {
                    // If the item is not in the cart, add a new CartItem
                    cart.Items.Add(new CartItem { ProductId = product.product_id, Quantity = quantity });
                }
                else
                {
                    // If the item is already in the cart, update the quantity
                    existingItem.Quantity += quantity;
                }

                // Save changes
                db.Update(cart);
                var result = await db.SaveChangesAsync();
                //Console.WriteLine($"Cart State: {db.Entry(cart).State}");
                //Console.WriteLine($"Product State: {db.Entry(product).State}");
                //Console.WriteLine($"ExistingItem State: {db.Entry(existingItem).State}");

                if (result > 0) return CreatedAtRoute("GetCart", MapCartToDto(cart));

                // If fail
                return BadRequest(new ProblemDetails { Title = "Problem saving item to cart" });
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }




        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity, string userId)
        {
            // Get Cart
            var cart = await RetrieveCart(userId);
            if (cart == null) { return NotFound(); }

            // Remove item or reduce quantity

            var item = cart.Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null)
            {
                return NotFound("This product is not in your cart");
            }
            item.Quantity -= quantity;

            if (item.Quantity == 0)
            {
                cart.Items.Remove(item);
            }

            // Save changes
            var result = await db.SaveChangesAsync();
            if (result > 0) return StatusCode(201);

            //if fail
            return BadRequest(new ProblemDetails { Title = "Prolem removing item from cart" });
        }

        private async Task<Cart?> RetrieveCart(string userId)
        {
            var cart = await db.Carts
                                .Include(ci => ci.Items)
                                .ThenInclude(p => p.Product)
                                .FirstOrDefaultAsync(x => x.UserId == userId);

            // Ensure that cart.Items is initialized as an empty array if it's null
            if (cart != null && cart.Items == null)
            {
                cart.Items = new List<CartItem>();
            }

            return cart;
        }

        private async Task<Cart> CreateCart(string userId)
        {
            // Create new cart
            var cart = new Cart { UserId = userId };

            // Start tracking entity that is added
            db.Carts.Add(cart);

            // Save changes asynchronously
            await db.SaveChangesAsync();

            return cart;
        }

        private CartDto MapCartToDto(Cart? cart)
        {
            return new CartDto
            {
                Id = cart.CartId,
                user_Id = cart.UserId,
                Items = cart.Items.Select(item => new CartItemDto
                {

                    product_id = item.ProductId,
                    product_quantity = item.Quantity,
                    product_name = item.Product.product_name,
                    product_type = item.Product.product_type,
                    product_img = item.Product.product_img,
                    product_price = item.Product.product_price,
                }).ToList(),
            };
        }
    


        //[HttpGet(Name = "GetCart")]
        //public async Task<ActionResult<CartDto>> GetCart(string userId)
        //{
        //    try
        //    {
        //        // Assuming _cartRepo.RetrieveCart returns Task<Cart>
        //        var cart = await _cartRepo.RetrieveCart(userId);

        //        if (cart == null)
        //        {
        //            return NotFound();
        //        }

        //        // Map the Cart entity to CartDto using the repository method
        //        var cartDto = _cartRepo.MapCartToDto(cart);

        //        // Return the CartDto in the response
        //        return Ok(cartDto);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception or handle it accordingly
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}
        //[HttpPost]
        //public async Task<ActionResult<CartDto>> AddItemToCart(int productId, int quantity, string userId)
        //{
        //    try
        //    {
        //        // Get Cart || Create Cart
        //        var cart = await _cartRepo.RetrieveCart(userId);
        //        if (cart == null)
        //        {
        //            cart = _cartRepo.CreateCart(userId);
        //        }

        //        // Get Product
        //        var product = await db.Products.FindAsync(productId);
        //        if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

        //        // Add Item
        //        cart.AddItem(product, quantity);

        //        // Save changes asynchronously
        //        var result = await db.SaveChangesAsync();

        //        // Check if changes were saved successfully
        //        if (result > 0)
        //        {
        //            // Return the updated cart information
        //            return CreatedAtRoute("GetCart", _cartRepo.MapCartToDto(cart));
        //        }

        //        // If saving changes fails
        //        return BadRequest(new ProblemDetails { Title = "Problem saving item to cart" });
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception or handle it accordingly
        //        return StatusCode(500, $"Internal Server Error: {ex.Message}");
        //    }
        //}




        //[HttpPut]
        //public async Task<IActionResult> UpdateCartQuantity(Cart cart)
        //{
        //    if (await _cartRepo.UpdateCartQuantity(cart))
        //    {
        //        return Ok();
        //    }
        //    return BadRequest();
        //}

        //[HttpGet("{userId}")]
        //public async Task<IActionResult> GetCartByUserId(string userId)
        //{
        //    return Ok(await _cartRepo.GetCartByUserId(userId));
        //}

        //[HttpDelete("{userId}/{productId}")]
        //public async Task<IActionResult> DeleteCart(string userId, int productId)
        //{
        //    if (await _cartRepo.DeleteCart(userId, productId))
        //    {
        //        return Ok("Delete Cart Success");
        //    }
        //    return BadRequest();
        //}
    }
}