namespace SpeedReaderAPI.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SpeedReaderAPI.Constants;
public class Article
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Title is required.")]
    [StringLength(ValidationConstants.MaxTitleLength,
            MinimumLength = ValidationConstants.MinTitleLength,
            ErrorMessage = "Title must be between {2} and {1} characters.")]
    public required string Title { get; set; }
    public string? CategoryTitle { get; set; }
    
    public string? ImageFileName { get; set; }
    public MimeType? ImageMimeType { get; set; }
    [NotMapped]
    public Image? Image
    {
        get
        {
            if (!string.IsNullOrEmpty(ImageFileName) && ImageMimeType.HasValue)
            {
                return new Image(ImageFileName, ImageMimeType.Value);
            }
            return null; 
        }
        set
        {
            if (value.HasValue)
            {
                ImageFileName = value.Value.ImageFilePath;
                ImageMimeType = value.Value.ImageMimeType;
            }
            else 
            {
                ImageFileName = null;
                ImageMimeType = null;
            }
        }
    }

    // ONE TO MANY
    public List<int> ParagraphIds { get; set; }  = [];
    public virtual ICollection<Paragraph> Paragraphs { get; set; }  = [];
}
