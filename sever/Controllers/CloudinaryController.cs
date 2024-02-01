using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Options;


namespace UploadFileWithCloudinaryASPNetCore.Controllers
{
    [Route("api/")]
    public class UploadController : Controller
    {
        private Cloudinary cloudinary;

        public UploadController(IOptions<Cloudinary> cloudinaryConfig)
        {
            Account account = new Account(
                "djlpsqdp4",
                "981324586668599",
                "aYn6pp066rK0Y0EUxZp0oQ-ARhg");
            cloudinary = new Cloudinary(account);
            cloudinary.Api.Secure = true;
        }

        // POST: api/upload-file
        [HttpPost]
        [Route("upload-file")]
        public IActionResult UploadFileWithCloudinary(List<IFormFile> files)
        {
            var link = "";
            try
            {
                int i = 1;
               // var photo = HttpContext.Request.Form.Files;
                foreach (var item in files)
                {
                    var image = item.OpenReadStream();
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(String.Format("{0}_{1}", "djlpsqdp4", i), image),
                        UseFilename = true,
                    };
                    var uploadResult = cloudinary.Upload(uploadParams);

                    link += uploadResult.SecureUrl.ToString();

                    if (link == "")
                    {
                        return Ok("Thêm ảnh thất bại");
                    }
                    i++;
                }
            }
            catch
            {
                return Ok("Thêm ảnh thất bại");
            }
            return Ok(link);
        }
    }
}