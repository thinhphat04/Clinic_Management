using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
﻿using Azure;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using PJ_SEM03.RequestHelpers;
using PJ_SEM03.DTO;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace PJ_SEM03.Services
{
    public class ProductService : IProductRepo
    {
        private readonly DatabaseContext _dbContext;
        private readonly CloudinaryService _cloudinaryService;


        public ProductService(DatabaseContext dbContext, CloudinaryService cloudinaryService)
        {
            _dbContext = dbContext;
            _cloudinaryService = cloudinaryService;
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
        
        public async Task<ActionResult<Product>> createProduct(productDTO product)
        {
            if (product.Image != null)
            {
                CloudinaryService cloud = new CloudinaryService();
                string url = cloud.UploadImage(product.Image);
                product.product_img = url;
            }
            var newProdut = new Product
            {
                product_description = product.product_description,
                product_name = product.product_name,
                product_type = product.product_type,
                product_price = product.product_price,
                product_star = product.product_star,
                product_percent = product.product_percent,
                product_quantity = product.product_quantity,
                product_img = product.product_img,
            };

            _dbContext.Products.Add(newProdut);
            await _dbContext.SaveChangesAsync();
            return newProdut;
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