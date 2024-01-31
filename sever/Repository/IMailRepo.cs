using PJ_SEM03.Models;

namespace PJ_SEM03.Repository
{
    public interface IMailRepo
    {
        Task SendEmailAsync(MailRequest mailRequest);
    }
}
