using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.DTO;
using PJ_SEM03.RequestHelpers;
using Product = PJ_SEM03.Models.Product;

namespace PJ_SEM03.Repository
{
    public interface IProductRepo
    {
       // Task<ActionResult<Product>> createProduct(Product product);
       Task<ActionResult<Product>> createProduct(productDTO product);
       Task<ActionResult<Product>> updateProduct(int id, productDTO product);
       
       Task<ActionResult<Product>> UpdateProductImage(int id, IFormFile newImage);

       
       Task<ActionResult<Product>> deleteProduct(int id);
       Task<IEnumerable<Product>> GetProductsByName(string name);
       Task<List<Product>> getAll();
       Task<IEnumerable<Product>> getProductByType(string product_type);
       Task<ActionResult<Product>> DecreaseQuantity(int productId, int quantity);
       Task<List<Product>> getAll(bool isAscending);

    }
}
