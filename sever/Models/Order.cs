using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace PJ_SEM03.Models
{
    public class Order
    {
        [Key]
        public int order_id { get; set; }
        public string order_code { get; set; }
        public string user_id { get; set; }
        public DateTime order_datetime { get; set; }
        public string order_status { get; set; }
        public string order_address { get; set; }
        public string order_phone { get; set; }
        public int order_total { get; set; }
        public User? User { get; set; }
        public ICollection<OrderDetail>? OrderDetails { get; set; }
        public GiftCode? AppliedGiftCode { get; set; } // Trường mới để lưu trữ giftcode

        // public void GenerateOrderCode()
        // {
        //     var length = 5;
        //     var random = new Random();
        //     const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        //     order_code = new string(Enumerable.Repeat(chars, length)
        //         .Select(s => s[random.Next(s.Length)]).ToArray());
        // }
        //
        // public void ApplyGiftCode(GiftCode giftCode)
        // {
        //     // Kiểm tra xem giftcode có hợp lệ không
        //     if (giftCode != null)
        //     {
        //         // Áp dụng giftcode
        //         this.AppliedGiftCode = giftCode;
        //         this.order_total = (int)giftCode.CalculateDiscount(this.order_total);
        //     }
        // }
    }
}