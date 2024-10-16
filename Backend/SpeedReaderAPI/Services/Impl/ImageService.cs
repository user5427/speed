namespace SpeedReaderAPI.Services.Impl;

using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Constants;
using SpeedReaderAPI.DTOs;
public class ImageService : IImageService {

    public ImageService() {
        string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), AppConstants.uploadedDirName);
        if (!Directory.Exists(directoryPath))
        {
            Directory.CreateDirectory(directoryPath);
        }
    }

    public async Task<Image> Create(ImageUploadRequest request)
    {
        IFormFile file = request.File;
        if (file == null) 
        {
            throw new ArgumentNullException("No file uploaded.");
        }

        MimeType? mimeType = MimeTypeHelpers.GetMimeTypeFromFileName(file.FileName);
        if (mimeType == null)
        {
            throw new InvalidOperationException(file.FileName);
        }
        string randomName = Path.GetRandomFileName();
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), AppConstants.uploadedDirName, randomName);

        using (Stream stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }
        return new Image(file.FileName, (MimeType)mimeType, randomName);
    }
    public Stream? Get(Image img)
    {
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), AppConstants.uploadedDirName, img.ImageFilePath);
        if (!File.Exists(filePath))
        {
            return null;
        }
        return new FileStream(filePath, FileMode.Open, FileAccess.Read);
    }
    public void Delete(Image image)
    {
        string filePath = Path.Combine(Directory.GetCurrentDirectory(), AppConstants.uploadedDirName, image.ImageFilePath);
        File.Delete(filePath);
    }
}