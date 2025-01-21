using aspnet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ViewersController(ApplicationDbContext context) : ControllerBase
{
  private readonly ApplicationDbContext _context = context;

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Viewer>>> GetViewers()
  {
    return await _context.Viewers.ToListAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Viewer>> GetViewer(int id)
  {
    var viewer = await _context.Viewers.FindAsync(id);

    if (viewer == null)
    {
      return NotFound();
    }

    return viewer;
  }

  [HttpPost]
  public async Task<ActionResult<Viewer>> PostViewer(Viewer viewer)
  {
    _context.Viewers.Add(viewer);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetViewer), new { id = viewer.Id }, viewer);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> PutViewer(int id, Viewer viewer)
  {
    if (id != viewer.Id)
    {
      return BadRequest();
    }

    _context.Entry(viewer).State = EntityState.Modified;

    try
    {
      await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
      if (!_context.Viewers.Any(e => e.Id == id))
      {
        return NotFound();
      }

      throw;
    }

    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteViewer(int id)
  {
    var viewer = await _context.Viewers.FindAsync(id);
    if (viewer == null)
    {
      return NotFound();
    }

    _context.Viewers.Remove(viewer);
    await _context.SaveChangesAsync();

    return NoContent();
  }
}
