using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.Models;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Repository
{
    public interface IFeedbackRepo
    {
        Task<PagedList<Feedback>> getAll(int pageNumber, int pageSize);
        Task<PagedList<Feedback>> getFeedbackByProductId(int product_id, int pageNumber, int pageSize);
        Task<bool> CreateFeedback(string userId, int productId, Feedback feedback);
        Task<bool> CheckUserPurchase(string userId, int productId);
    }
}
