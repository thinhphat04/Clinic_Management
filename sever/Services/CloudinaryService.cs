using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System.IO;

namespace PJ_SEM03.Services
{
    public class CloudinaryService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryService()
        {
            var account = new Account(
                "djlpsqdp4",
                "981324586668599",
                "aYn6pp066rK0Y0EUxZp0oQ-ARhg"
            );
            _cloudinary = new Cloudinary(account);
        }

        public string UploadImage(IFormFile file, string publicId = null)
        {
            if (file == null || file.Length == 0)
            {
                // Handle invalid file
                return null;
            }

            using (var stream = file.OpenReadStream())
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    PublicId = publicId, // Optionally set a public ID for the uploaded file
                };

                var uploadResult = _cloudinary.Upload(uploadParams);
                return uploadResult.SecureUrl.ToString();
            }
        }
    }
}