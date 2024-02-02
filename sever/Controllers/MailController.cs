using MailKit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.DTO;
using PJ_SEM03.Models;
using PJ_SEM03.Repository;
using System.Security.Cryptography;

namespace PJ_SEM03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailRepo mailService;

        public MailController(IMailRepo mailService)
        {
            this.mailService = mailService;
        }

        [HttpPost("Reply")]
        public async Task<IActionResult> SendMail(MailModel model)
        {
            try
            {
                MailRequest mailRequest = new MailRequest();
                mailRequest.ToEmail = model.ToEmail;
                mailRequest.Subject = model.Subject ;
                mailRequest.Body = model.Body; ;
                await mailService.SendEmailAsync(mailRequest);
                return Ok(mailRequest);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost("SendMailOrder")]
        public async Task<IActionResult> SendMailOrder(MailForOrder model)
        {
            try
            {
                MailRequest mailRequest = new MailRequest();
                mailRequest.ToEmail = model.ToEmail;
                mailRequest.Subject = model.Subject; ;
                mailRequest.Body = getHtmlContent(model);
                await mailService.SendEmailAsync(mailRequest);
                return Ok(mailRequest);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private string getHtmlContent(MailForOrder model)
        {
            string response = "<div>";
            response += "<h3>This is your Order Information</h3>";
            response += $"<p>Order Code: {model.OrderCode}</p>";
            response += $"<p>Total Price: {model.totalPrice}</p>";
            response += $"<p>We will contact you through the phone number: {model.PhoneNumber}</p>";
            response += "</div>";
            return response;
        }
    }
}
