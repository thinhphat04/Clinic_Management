using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using PJ_SEM03.RequestHelpers;
using PJ_SEM03.Services;
using Product = PJ_SEM03.Models.Product;

namespace PJ_SEM03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepo productRepo;
        // private readonly CloudinaryService _cloudinaryService;
        //         private readonly IWebHostEnvironment HostEnvironment;


        public ProductsController(IProductRepo productRepo)
        {
            this.productRepo = productRepo;
            // this._cloudinaryService = _cloudinaryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAll()
        {
            try
            {
                return Ok(await productRepo.getAll());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("{product_type}")]
        public async Task<ActionResult> getByType(string product_type)
        {
            try
            {
                return Ok(await productRepo.getProductByType(product_type));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm]productDTO product)
        {
            try
            {
                return Ok(await productRepo.createProduct(product));
            }
            catch (Exception  ex)
            {
                return BadRequest(ex);
            }

        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, [FromForm]productDTO product)
        {
            try
            {
                return Ok(await productRepo.updateProduct(id, product));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Product>> DeleteProduct(int id)
        {
            return await productRepo.deleteProduct(id);
        }

        [HttpGet("search/{name}")]
        public async Task<IActionResult> GetProductsByName(string name)
        {
            return Ok(await productRepo.GetProductsByName(name));
        }
        
        [HttpGet("sort/{isAscending}")]
        public async Task<IActionResult> GetProducts(bool isAscending)
        {
            return Ok(await productRepo.getAll(isAscending));
        }
        
        
    }
}