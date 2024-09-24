namespace SpeedReaderAPI.Entities;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SpeedReaderAPI.Attributes;
using SpeedReaderAPI.Constants;
using SpeedReaderAPI.DTOs;

public class Question
{
    [Key]
    public int Id { get; set; }

    [ForeignKey(nameof(Paragraph))]
    public int ParagraphId { get; set; }

    [Required(ErrorMessage = "Question text is required.")]
    [StringLength(ValidationConstants.MaxQuestionTextLength,
        MinimumLength = ValidationConstants.MinQuestionTextLength,
        ErrorMessage = "Question text must be between {2} and {1} characters.")]
    public required string QuestionText { get; set; }

    [AnswerChoicesValidation]
    public required string[] AnswerChoices { get; set; }

    [Required(ErrorMessage = "Correct answer choice is required.")]
    [StringLength(ValidationConstants.MaxAnswerChoiceLength,
        ErrorMessage = "Correct answer choice cannot exceed {1} characters.")]
    public required string CorrectAnswerChoice { get; set; }

    public virtual Paragraph? Paragraph { get; set; }

}
