using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.Models;

public class Scientific
{
    [Key]
    public int sci_id { get; set; }
    public string sci_uses { get; set; }
    
    public string sci_brand { get; set; }
    
    public string product_type { get; set; }
    
}