using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

namespace SpeedReaderAPI.Entities;

public class Category
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Title is required.")]
    [StringLength(ValidationConstants.MaxTitleLength,
            MinimumLength = ValidationConstants.MinTitleLength,
            ErrorMessage = "Title must be between {2} and {1} characters.")]
    public required string Title { get; set; }
    public string? ImageFileName { get; set; }
    public List<Article> ArticleIds { get; set; } = [];
    public virtual List<Article> Articles { get; set; } = [];
}