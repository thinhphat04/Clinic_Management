namespace PJ_SEM03.Models
{
    public class EmailConfiguration
    {
        public string From { get; set; }
        public string SmtpServer { get; set; }
        public int Port { get; set; }
        public string UserName { get; set; } = null;
        public string Password { get; set; } = null;
    }
}
