using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public async Task<PagedList<Feedback>> getAll(int pageNumber, int pageSize)
        {
            var query = _dbContext.Feedbacks.AsQueryable();
            var feedbacks = await PagedList<Feedback>.ToPagedList(query, pageNumber, pageSize);
            return feedbacks;
        }

        public async Task<PagedList<Feedback>> getFeedbackByProductId(int product_id, int pageNumber, int pageSize)
        {
            var query = _dbContext.Feedbacks.Where((x => x.product_id == product_id)).AsQueryable();
            var feedbacks = await PagedList<Feedback>.ToPagedList(query, pageNumber, pageSize);
            return feedbacks;
        }
    }
}
