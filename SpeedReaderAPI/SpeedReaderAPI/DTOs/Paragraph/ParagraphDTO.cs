
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;
using SpeedReaderAPI.DTOs.Question;

namespace SpeedReaderAPI.DTOs.Paragraph;

public class ParagraphDTO
{
    public int ArticleId { get; set; }
    public int Id { get; set; }
    [Required(ErrorMessage = "Text is required.")]
    [StringLength(ValidationConstants.MaxParagraphLength,
        MinimumLength = ValidationConstants.MinParagraphLength,
        ErrorMessage = "Text must be between {2} and {1} characters.")]
    public string Text { get; set; }
    public int nextParagraphId { get; set; }
    public ICollection<QuestionDTO> Questions { get; set; }

}
