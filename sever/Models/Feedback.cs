using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PJ_SEM03.Models;

public class Feedback
{
    [Key]
    public int feedback_id { get; set; }
    public string feedback_email { get; set; }
    public string feedback_fullname { get; set; }
    public string feedback_type { get; set; }
    public string feedback_content { get; set; }
}
