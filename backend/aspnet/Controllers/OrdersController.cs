using aspnet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
  private readonly ApplicationDbContext _context;

  public OrdersController(ApplicationDbContext context)
  {
    _context = context;
  }

  [HttpGet("filter")]
  public async Task<IActionResult> GetOrdersByDateRange(DateTime startDate, DateTime endDate)
  {
    try
    {
      var utcStartDate = DateTime.SpecifyKind(startDate, DateTimeKind.Utc);
      var utcEndDate = DateTime.SpecifyKind(endDate, DateTimeKind.Utc);

      var orders = await _context.Orders
          .Include(o => o.Viewer)
          .Include(o => o.Ticket)
          .Where(o => o.OrderDate >= utcStartDate && o.OrderDate <= utcEndDate)
          .ToListAsync();

      return Ok(orders);
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Internal server error: {ex.Message}");
    }
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
  {
    return await _context.Orders
        .Include(o => o.Viewer)
        .Include(o => o.Ticket)
        .ToListAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Order>> GetOrder(int id)
  {
    var order = await _context.Orders
        .Include(o => o.Viewer)
        .Include(o => o.Ticket)
        .FirstOrDefaultAsync(o => o.Id == id);

    if (order == null)
    {
      return NotFound();
    }

    return order;
  }

  [HttpPost]
  public async Task<ActionResult<Order>> PostOrder(Order order)
  {
    _context.Orders.Add(order);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> PutOrder(int id, Order order)
  {
    if (id != order.Id)
    {
      return BadRequest();
    }

    _context.Entry(order).State = EntityState.Modified;

    try
    {
      await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
      if (!_context.Orders.Any(e => e.Id == id))
      {
        return NotFound();
      }

      throw;
    }

    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteOrder(int id)
  {
    var order = await _context.Orders.FindAsync(id);
    if (order == null)
    {
      return NotFound();
    }

    _context.Orders.Remove(order);
    await _context.SaveChangesAsync();

    return NoContent();
  }
}
