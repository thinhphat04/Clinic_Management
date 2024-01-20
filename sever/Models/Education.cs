using System.ComponentModel.DataAnnotations;

namespace PJ_SEM03.Models;

public class Education
{
  [Key]
    public int edu_id { get; set; }
    // public string edu_video { get; set; }
    
    public string edu_teacher { get; set; }
    
    public string edu_description { get; set; }
    
    public string edu_subject { get; set; }
    
    public string product_type { get; set; }
    
}