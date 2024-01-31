using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PJ_SEM03.Services
{
    public class ImageService
    {
        private readonly IWebHostEnvironment _hostEnvironment;

        public ImageService(IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
        }

        public async Task<string> SaveImage(IFormFile formFile)
        {
            string imageName = new string(Path.GetFileNameWithoutExtension(formFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(formFile.FileName);

            // Thêm tiền tố "Images/" vào imageName
            string imageNameWithPath = "Images/" + imageName;

            // Cập nhật đường dẫn lưu trữ ảnh
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, imageNameWithPath);

            // Tạo thư mục nếu nó chưa tồn tại
            var directoryPath = Path.GetDirectoryName(imagePath);
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            // Kiểm tra xem tệp hình ảnh có tồn tại trước khi tạo một tệp mới
            if (!System.IO.File.Exists(imagePath))
            {
                using (var fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    await formFile.CopyToAsync(fileStream);
                }
            }

            return imageNameWithPath;
        }
    }
}