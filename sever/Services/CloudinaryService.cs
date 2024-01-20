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

        public string UploadImage(string imagePath)
        {
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(imagePath)
            };
            var uploadResult = _cloudinary.Upload(uploadParams);
            return uploadResult.Url.ToString();
        }
    }
}