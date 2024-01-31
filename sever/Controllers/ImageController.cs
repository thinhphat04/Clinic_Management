using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PJ_SEM03.Services;
using System.Threading.Tasks;

namespace PJ_SEM03.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly ImageService _imageService;
    // Compare this snippet from sever/Controllers/ImageController.cs:
        public ImageController(ImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var imagePath = await _imageService.SaveImage(file);

            return Ok(new { imagePath });
        }
    }
}