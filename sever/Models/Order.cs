using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.Models
{
    public class Order
    {
        [Key]
        public int order_id { get; set; }
        //oder_code vừa chữ vừa số nên để string random code
        
        public string order_code { get; set; }
        public string user_id { get; set; }
        public int CartId { get; set; }

        public DateTime order_datetime { get; set; }
        
        public string order_status { get; set; }
        
        public string order_address { get; set; }
        
        public string order_phone { get; set; }
        
        public int order_total { get; set; }
        
        public User? User { get; set; }
        
        public ICollection<OrderDetail>? OrderDetails { get; set; }
        
        public void GenerateOrderCode()
        {
            var length = 5;
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            order_code = new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        
    }
}
