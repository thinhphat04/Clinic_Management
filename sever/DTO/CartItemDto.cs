namespace PJ_SEM03.DTO
{
    public class CartItemDto
    {
        public int product_id { get; set; }

        public string product_name { get; set; }

        public string? product_type { get; set; }

        public string product_img { get; set; }

        public int? product_quantity { get; set; }

        public int? product_price { get; set; }
    }
}
