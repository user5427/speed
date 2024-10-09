using SpeedReaderAPI.Entities;

namespace SpeedReaderAPI.Services;


public interface IImageService
{
    public Task<Image> Create(IFormFile file);
    public Stream? Get(Image image);
    public void Delete(Image image);
}
