using aspnet.Models;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

  public DbSet<Viewer> Viewers { get; set; }
  public DbSet<Ticket> Tickets { get; set; }
  public DbSet<Order> Orders { get; set; }

  override protected void OnModelCreating(ModelBuilder modelBuilder)
  {
    var viewers = new List<Viewer>
    {
      new() { Id = 1, Name = "John Doe", Age = 20, Gender = "male" },
      new() { Id = 2, Name = "Jane Doe", Age = 18, Gender = "female" }
    };
    modelBuilder.Entity<Viewer>().HasData(viewers);

    var tickets = new List<Ticket>
    {
      new() { Id = 1, MovieTitle = "Dead Pool", SeatNumber = "A7", ShowTime = 
        DateTime.SpecifyKind(DateTime.Parse("08/20/2025 12:22:16"), DateTimeKind.Utc) },
      new() { Id = 2, MovieTitle = "Dead Pool", SeatNumber = "A6", ShowTime = 
        DateTime.SpecifyKind(DateTime.Parse("08/20/2025 12:22:16"), DateTimeKind.Utc) }
    };
    modelBuilder.Entity<Ticket>().HasData(tickets);

    var orders = new List<Order>
    {
      new() { Id = 1, ViewerId = 1, TicketId = 1, OrderDate = 
        DateTime.SpecifyKind(DateTime.Parse("08/20/2025 10:22:16"), DateTimeKind.Utc) },
      new() { Id = 2, ViewerId = 2, TicketId = 2, OrderDate = 
        DateTime.SpecifyKind(DateTime.Parse("08/20/2025 10:24:16"), DateTimeKind.Utc) }
    };
    modelBuilder.Entity<Order>().HasData(orders);
  }
}