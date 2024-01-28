using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.Models;

public class User : IdentityUser
{
    public string? user_fullName { get; set; }
    public string? user_address { get; set; }
    public string Role { get; set; }

    public ICollection<Order> Orders { get; set; }
    public ICollection<Feedback>? Feedbacks { get; set; }
    
    public ICollection<Cart>? Carts { get; set; }
    
    
}