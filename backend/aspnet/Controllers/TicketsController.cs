using aspnet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TicketsController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public TicketsController(ApplicationDbContext context)
  {
    _context = context;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
  {
    return await _context.Tickets.ToListAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Ticket>> GetTicket(int id)
  {
    var ticket = await _context.Tickets.FindAsync(id);

    if (ticket == null)
    {
      return NotFound();
    }

    return ticket;
  }

  [HttpPost]
  public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
  {
    _context.Tickets.Add(ticket);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> PutTicket(int id, Ticket ticket)
  {
    if (id != ticket.Id)
    {
      return BadRequest();
    }

    _context.Entry(ticket).State = EntityState.Modified;

    try
    {
      await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
      if (!_context.Tickets.Any(e => e.Id == id))
      {
        return NotFound();
      }

      throw;
    }

    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteTicket(int id)
  {
    var ticket = await _context.Tickets.FindAsync(id);
    if (ticket == null)
    {
      return NotFound();
    }

    _context.Tickets.Remove(ticket);
    await _context.SaveChangesAsync();

    return NoContent();
  }
}
