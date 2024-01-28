namespace PJ_SEM03.DTO
{
    public class FeedbackDto
    {
        public int FeedbackId { get; set; }
        public int ProductId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Fullname { get; set; }

        public string Descrisption { get; set; }

        public int Rating { get; set; }
    }
}
