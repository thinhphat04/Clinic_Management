﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PJ_SEM03.Models
{
    [Table("CartItems")]
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        public int Quantity { get; set; }

        // Navigation properties
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int CartId { get; set; }
        public Cart Cart { get; set; }
    }
}
