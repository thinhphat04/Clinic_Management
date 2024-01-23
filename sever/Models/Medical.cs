using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.Models;

public class Medical :  Product
{
    public int med_id { get; set; }
    
    public string med_uses { get; set; }
    //[0,1] [baby,adult]
    public string med_sex { get; set; } 
    
    public string med_brand { get; set; }
    
    public string product_type { get; set; }
}