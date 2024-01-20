using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.Models;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Repository
{
    public interface IProductRepo
    {
       Task<ActionResult<IEnumerable<Product>>> getAll();
       Task<ActionResult<IEnumerable<Product>>> getProductByType(string product_type);
       Task<ActionResult<Product>> createProduct(Product product);
       Task<ActionResult<Product>> updateProduct(int id, Product product);
       Task<ActionResult<Product>> deleteProduct(int id);
       
       Task<IEnumerable<Product>> GetProductsByName(string name);
       Task<PagedList<Product>> getAll(int pageNumber, int pageSize);
       Task<IEnumerable<Product>> getProductByType(string product_type);
       Task<Product> getProductById(int product_id);
    }
}
