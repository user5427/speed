namespace SpeedReaderAPI.Services.Impl;

using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Constants;
public class ImageService : IImageService {

    public ImageService() {
        string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), AppConstants.uploadedDirName);
        if (!Directory.Exists(directoryPath))
        {
            Directory.CreateDirectory(directoryPath);
        }
    }

    public async Task<Image> Create(IFormFile file)
    {
        if (file == null) 
        {
            throw new ArgumentNullException("No file uploaded.");
        }

        MimeType? mimeType = MimeTypeHelpers.GetMimeTypeFromFileName(file.FileName);
        if (mimeType == null)
        {
            throw new InvalidOperationException(file.FileName);
        }
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), AppConstants.uploadedDirName, file.FileName);

        using (Stream stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return new Image(file.FileName, (MimeType)mimeType);
    }
    public Stream? Get(Image img)
    {
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), AppConstants.uploadedDirName, img.ImageFilePath);
        if (!System.IO.File.Exists(filePath))
        {
            return null;
        }
        return new FileStream(filePath, FileMode.Open, FileAccess.Read);
    }
    public void Delete(Image image)
    {
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), AppConstants.uploadedDirName, image.ImageFilePath);
        System.IO.File.Delete(filePath);
    }
}