namespace aspnet.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Order
{
  public int Id { get; set; }

  public int? ViewerId { get; set; }
  [ForeignKey(nameof(ViewerId))]
  public Viewer Viewer { get; set; }

  public int? TicketId { get; set; }
  [ForeignKey(nameof(TicketId))]
  public Ticket Ticket { get; set; }

  [Required]
  public DateTime OrderDate { get; set; }
}