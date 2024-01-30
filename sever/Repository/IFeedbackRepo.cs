using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.RequestHelpers;

namespace PJ_SEM03.Repository
{
    public interface IFeedbackRepo
    {
        Task<IEnumerable<Feedback>> GetAll();
        Task<IEnumerable<Feedback>> GetByType(string type);
        Task<Feedback> CreateFeedback(Feedback feedback);
    }
}
