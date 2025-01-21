namespace aspnet.Models;
using System.ComponentModel.DataAnnotations;

public class Ticket
{
    public int Id { get; set; }
    [Required]
    public string MovieTitle { get; set; }
    [Required]
    public string SeatNumber { get; set; }
    [Required]
    public DateTime ShowTime { get; set; }
}