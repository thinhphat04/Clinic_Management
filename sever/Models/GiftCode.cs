namespace PJ_SEM03.Models
{
    public class GiftCode
    {
        public int Id { get; set; }
        public string giftName { get; set; }
        public string Describe { get; set; }
        public int percentReduce { get; set; }
        public string ApplyFor { get; set; }
        
        // public decimal CalculateDiscount(decimal originalPrice)
        // {
        //     // Tính toán giảm giá dựa trên trường percentReduce
        //     decimal discountAmount = originalPrice * (percentReduce / 100m);
        //
        //     // Trả về giá sau khi đã giảm
        //     return originalPrice - discountAmount;
        // }
    }
}
