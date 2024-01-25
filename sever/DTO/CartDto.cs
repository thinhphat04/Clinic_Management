    namespace PJ_SEM03.DTO
{
    public class CartDto
    {
        public int Id { get; set; }
        public string user_Id { get; set; }
        public List<CartItemDto> Items { get; set; } = new List<CartItemDto>();
    }
}
