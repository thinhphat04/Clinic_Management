namespace PJ_SEM03.DTO
{
    public class UserWithImageDto
    {
        public string Id { get; set; }
        public string? Username { get; set; }
        public string? Fullname { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? AvatarUrl { get; set; }
        public string? Email { get; set; }
        public IFormFile? Image { get; set; }
    }
}
