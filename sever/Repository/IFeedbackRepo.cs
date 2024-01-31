using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Repository
{
    public interface IFeedbackRepo
    {
        Task<PagedList<FeedbackDto>> getAll(int pageNumber, int pageSize);
        Task<PagedList<FeedbackDto>> getFeedbackByProductId(int product_id, int pageNumber, int pageSize);
    }
}
