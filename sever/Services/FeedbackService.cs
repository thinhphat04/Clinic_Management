using Microsoft.EntityFrameworkCore;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;

namespace PJ_SEM03.Services
{
    public class FeedbackService : IFeedbackRepo
    {
        private readonly DatabaseContext _dbContext;

        public FeedbackService(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Feedback> CreateFeedback(Feedback feedback)
        {
            _dbContext.Feedbacks.Add(feedback);
            await _dbContext.SaveChangesAsync();

            return feedback;
        }

        public async Task<IEnumerable<Feedback>> GetAll()
        {
            return await _dbContext.Feedbacks.ToListAsync();
        }

        public async Task<IEnumerable<Feedback>> GetByType(string type)
        {
            return await _dbContext.Feedbacks.Where(x => x.feedback_type == type).ToListAsync();
        }
    }
}
