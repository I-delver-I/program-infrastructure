using aspnet.Models;
using Microsoft.EntityFrameworkCore;

namespace aspnet.Services
{
  public class ImageService(ApplicationDbContext context)
  {
    private readonly ApplicationDbContext _context = context;
    private static readonly string[] _allowedImageFormats = ["image/jpeg", "image/png", "image/gif"];

    /// <summary>
    /// Validates the uploaded file to ensure it is an allowed image format.
    /// </summary>
    private void ValidateImage(IFormFile file)
    {
      if (file == null || file.Length == 0)
      {
        throw new ArgumentException("File is empty or null.");
      }

      if (!_allowedImageFormats.Contains(file.ContentType))
      {
        throw new ArgumentException($"Invalid image format. Allowed formats are: {string.Join(", ", _allowedImageFormats)}");
      }
    }

    /// <summary>
    /// Uploads an image for a viewer and saves it in the database.
    /// </summary>
    public async Task<Viewer> UploadImageAsync(int viewerId, IFormFile file)
    {
      ValidateImage(file);

      var viewer = await _context.Viewers.FindAsync(viewerId) ?? throw new FileNotFoundException("Viewer not found.");
      using var memoryStream = new MemoryStream();
      await file.CopyToAsync(memoryStream);

      viewer.Image = memoryStream.ToArray();
      _context.Viewers.Update(viewer);
      await _context.SaveChangesAsync();

      return viewer;
    }

    /// <summary>
    /// Retrieves the image for a viewer.
    /// </summary>
    public async Task<byte[]> RetrieveImageAsync(int viewerId)
    {
      var viewer = await _context.Viewers.FindAsync(viewerId);
      if (viewer == null || viewer.Image == null)
      {
        throw new FileNotFoundException("Image not found.");
      }

      return viewer.Image;
    }

    /// <summary>
    /// Deletes the image for a viewer.
    /// </summary>
    public async Task DeleteImageAsync(int viewerId)
    {
      var viewer = await _context.Viewers.FindAsync(viewerId) ?? throw new FileNotFoundException("Viewer not found.");
      viewer.Image = null;
      _context.Viewers.Update(viewer);
      await _context.SaveChangesAsync();
    }

    /// <summary>
    /// Replaces the image for a viewer with a new one.
    /// </summary>
    public async Task<Viewer> ReplaceImageAsync(int viewerId, IFormFile file)
    {
      ValidateImage(file);

      var viewer = await _context.Viewers.FindAsync(viewerId) ?? throw new FileNotFoundException("Viewer not found.");
      using var memoryStream = new MemoryStream();
      await file.CopyToAsync(memoryStream);

      viewer.Image = memoryStream.ToArray();
      _context.Viewers.Update(viewer);
      await _context.SaveChangesAsync();

      return viewer;
    }
  }
}
