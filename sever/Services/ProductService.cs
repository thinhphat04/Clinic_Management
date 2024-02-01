using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
﻿using Azure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Services
{
    public class ProductService : IProductRepo
    {
        private readonly DatabaseContext _dbContext;
        private readonly Cloudinary _cloudinary;
       

        public ProductService(DatabaseContext dbContext )
        {
            _dbContext = dbContext;
        }

        public async Task<List<Product>> getAll()
        {
            return await _dbContext.Products.ToListAsync();
        }

        // public async Task<Product> getProductById(int product_id)
        // {
        //     return await _dbContext.Products.SingleOrDefaultAsync(x => x.product_id == product_id);
        // }

        public async Task<IEnumerable<Product>> getProductByType(string product_type)
        {
            return await _dbContext.Products.Where(x => x.product_type == product_type).ToListAsync();
        }
        
        public async Task<ActionResult<Product>> createProduct(Product product)
        {
            _dbContext.Products.Add(product);
            await _dbContext.SaveChangesAsync();
            return product;
        }
        public async Task<ActionResult<Product>> updateProduct(int id, Product product)
        {
            if (id != product.product_id)
            {
                return null;
            }

            _dbContext.Entry(product).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return product;
        }

        public async Task<ActionResult<Product>> deleteProduct(int id)
        {
            var product = await _dbContext.Products.FindAsync(id);
            if (product == null)
            {
                return null;
            }

            _dbContext.Products.Remove(product);
            await _dbContext.SaveChangesAsync();

            return product;
        }
        
        public async Task<IEnumerable<Product>> GetProductsByName(string name)
        {
            return await _dbContext.Products.Where(p => p.product_name.Contains(name)).ToListAsync();
        }
        public async Task<ActionResult<Product>> DecreaseQuantity(int productId, int quantity)
        {
            var product = await _dbContext.Products.FindAsync(productId);
            if (product == null)
            {
                throw new Exception("Product not found");
            }

            if (product.product_quantity < quantity)
            {
                throw new Exception("Not enough product in stock");
            }

            product.product_quantity -= quantity;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log the exception message
                Console.WriteLine(ex.Message);
                throw;
            }

            return product;
        }
    }
}