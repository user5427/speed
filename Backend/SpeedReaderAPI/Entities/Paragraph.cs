namespace SpeedReaderAPI.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SpeedReaderAPI.Constants;
using SpeedReaderAPI.DTOs;

public class Paragraph
{
	[Key]
    public int Id { get; set; }

	[StringLength(ValidationConstants.MaxTitleLength,
	MinimumLength = ValidationConstants.MinTitleLength,
	ErrorMessage = "Title must be between {2} and {1} characters.")]
	public string? Title { get; set; }

	[ForeignKey(nameof(Article))]
    public int ArticleId { get; set; }

    [Required(ErrorMessage = "Text is required.")]
    [StringLength(ValidationConstants.MaxParagraphLength,
        MinimumLength = ValidationConstants.MinParagraphLength,
        ErrorMessage = "Text must be between {2} and {1} characters.")]
    public required string Text { get; set; }
    public int? nextParagraphId { get; set; }

    public virtual Article? Article { get; set; }
    // ONE TO MANY
    public List<int>? QuestionIds { get; set; }
    public virtual List<Question>? Questions { get; set; } = new List<Question>();
}
