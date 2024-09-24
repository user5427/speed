namespace SpeedReaderAPI.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;
using SpeedReaderAPI.DTOs.Responses;
public class Article
{
    [Key]
    public int Id { get; set; }

    // [ForeignKey(nameof(Category))]
    // public int? CategoryId { get; set; }

    [Required(ErrorMessage = "Title is required.")]
    [StringLength(ValidationConstants.MaxTitleLength,
            MinimumLength = ValidationConstants.MinTitleLength,
            ErrorMessage = "Title must be between {2} and {1} characters.")]
    public required string Title { get; set; }

    // public virtual Category? Category { get; set; }
    public virtual ICollection<Paragraph> Paragraphs { get; set; } = new List<Paragraph>();
}
