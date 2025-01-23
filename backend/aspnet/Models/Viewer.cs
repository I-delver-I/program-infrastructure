namespace aspnet.Models;
using System.ComponentModel.DataAnnotations;

public class Viewer
{
  public int Id { get; set; }
  [Required]
  public string Name { get; set; }
  [Required]
  public int Age { get; set; }
  [Required]
  public string Gender { get; set; }
  public byte[] Image { get; set; }
}