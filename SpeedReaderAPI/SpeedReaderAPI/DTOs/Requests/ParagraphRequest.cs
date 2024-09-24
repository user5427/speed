namespace SpeedReaderAPI.DTOs.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

public class ParagraphRequest
{
    [Required(ErrorMessage = "Text is required.")]
    [StringLength(ValidationConstants.MaxParagraphLength,
        MinimumLength = ValidationConstants.MinParagraphLength,
        ErrorMessage = "Text must be between {2} and {1} characters.")]
    public string Text { get; init; }
}
