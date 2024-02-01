using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Repository
{
    public interface IProductRepo
    {
       Task<ActionResult<Product>> createProduct(productDTO product);
       // Task<Product> createProduct(Product product, IFormFile image);
       
       // Task<ActionResult<Product>> createProduct(Product product, IFormFile image);
       // Task<ActionResult<Product>> updateProduct(int id, Product product, IFormFile image);

       Task<ActionResult<Product>> updateProduct(int id, Product product);
       Task<ActionResult<Product>> deleteProduct(int id);
       Task<IEnumerable<Product>> GetProductsByName(string name);
       Task<List<Product>> getAll();
       Task<IEnumerable<Product>> getProductByType(string product_type);
       Task<ActionResult<Product>> DecreaseQuantity(int productId, int quantity);
    }
}
