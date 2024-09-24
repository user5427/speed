
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

namespace SpeedReaderAPI.DTOs;

public class ParagraphDTO {
    public int Id { get; set; }
    [Required(ErrorMessage = "Text is required.")]
    [StringLength(ValidationConstants.MaxParagraphLength,
        MinimumLength = ValidationConstants.MinParagraphLength,
        ErrorMessage = "Text must be between {2} and {1} characters.")]
    public string Text { get; set; }
    public ICollection<QuestionDTO> Questions { get; set; }

}
