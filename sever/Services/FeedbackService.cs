using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Services
{
    public class FeedbackService : IFeedbackRepo
    {
        private readonly DatabaseContext _dbContext;

        public FeedbackService(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CreateFeedback(string userId, int productId, Feedback feedback)
        {
            // Check if the user has purchased the product
            bool hasPurchased = await CheckUserPurchase(userId, productId);

            if (hasPurchased)
            {
                // User has purchased the product, create feedback
                var feedbackDto = new Feedback
                {
                    user_id = userId,
                    product_id = productId,
                    feedback_description= feedback.feedback_description,
                    feedback_rating= feedback.feedback_rating,
                };

                _dbContext.Feedbacks.Add(feedback);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                // User has not purchased the product, feedback cannot be created
                return false;
            }
        }

        public async Task<bool> CheckUserPurchase(string userId, int productId)
        {
            // Retrieve the ordered products for the user
            var orderedProducts = _dbContext.Orders
                .Where(o => o.user_id == userId)
                .SelectMany(o => o.OrderDetails)
                .Select(od => od.Product)
                .ToList();

            // Check if the specified product is in the list of ordered products
            bool hasPurchased = orderedProducts.Any(product => product.product_id == productId);

            return hasPurchased;
        }

        [Authorize(Roles ="Admin")]
        public async Task<PagedList<Feedback>> getAll(int pageNumber, int pageSize)
        {
            var query = _dbContext.Feedbacks.AsQueryable();
            var feedbacks = await PagedList<Feedback>.ToPagedList(query, pageNumber, pageSize);
            return feedbacks;
        }

        public async Task<PagedList<FeedbackDto>> getFeedbackByProductId(int product_id, int pageNumber, int pageSize)
        {
            var query = _dbContext.Feedbacks.Where((x => x.product_id == product_id)).Include(x => x.User).AsQueryable();
            var feedbacks = await PagedList<FeedbackDto>.ToPagedList(query.Select(x => new FeedbackDto
            {
                FeedbackId = x.feedback_id,
                ProductId = x.product_id,
                UserId = x.user_id,
                UserName = x.User.UserName, // Assuming UserName is a property in the User entity
                                            // Include other properties you want in FeedbackDto
            }), pageNumber, pageSize);
            return feedbacks;
        }

  
    }
}
