using MailKit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        [HttpPost]
        public async Task<IActionResult> SendMail()
        {
            try
            {
                MailRequest mailRequest = new MailRequest();
                mailRequest.ToEmail = "tbdp138@gmail.com";
                mailRequest.Subject = "Order Information";
                mailRequest.Body = getHtmlContent();
                await mailService.SendEmailAsync(mailRequest);
                return Ok(mailRequest);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private string getHtmlContent()
        {
            string response = "<div>";
            response += "<h3>This is your Order Information</h3>";
            response += "</div>";
            return response;
        }
    }
}
