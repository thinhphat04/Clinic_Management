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
        public async Task<PagedList<FeedbackDto>> getAll(int pageNumber, int pageSize)
        {
            var query = _dbContext.Feedbacks.Include(f => f.user).AsQueryable();
            var feedbacks = await PagedList<FeedbackDto>.ToPagedList(query.Select(x => new FeedbackDto
            {
                FeedbackId = x.feedback_id,
                ProductId = x.product_id,
                UserId = x.user_id,
                UserName = x.user.UserName,
                Fullname = x.user.user_fullName,
                Descrisption = x.feedback_description,
                Rating = x.feedback_rating
            }), pageNumber, pageSize);
            return feedbacks;
        }

        public async Task<PagedList<FeedbackDto>> getFeedbackByProductId(int product_id, int pageNumber, int pageSize)
        {
            var query = _dbContext.Feedbacks.Where((x => x.product_id == product_id)).Include(x => x.user).AsQueryable();
            var feedbacks = await PagedList<FeedbackDto>.ToPagedList(query.Select(x => new FeedbackDto
            {
                FeedbackId = x.feedback_id,
                ProductId = x.product_id,
                UserId = x.user_id,
                UserName = x.user.UserName,
                Fullname = x.user.user_fullName,
                Descrisption = x.feedback_description,
                Rating = x.feedback_rating
            }), pageNumber, pageSize);
            return feedbacks;
        }
    }
}
