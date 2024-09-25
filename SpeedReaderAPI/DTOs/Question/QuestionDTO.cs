using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

namespace SpeedReaderAPI.DTOs.Question;

public class QuestionDTO
{
    public int ParagraphId { get; set; }

    public int Id { get; set; }
    [Required(ErrorMessage = "Question is required.")]
    [StringLength(ValidationConstants.MaxQuestionTextLength,
                MinimumLength = ValidationConstants.MinQuestionTextLength,
                ErrorMessage = "Question must be between {2} and {1} characters.")]
    public required string QuestionText { get; set; }
    public required string[] AnswerChoices { get; set; }

    [Required(ErrorMessage = "Correct answer choice is required.")]
    [StringLength(ValidationConstants.MaxAnswerChoiceLength,
        ErrorMessage = "Correct answer choice cannot exceed {1} characters.")]
    public int CorrectAnswerIndex { get; set; }
}
