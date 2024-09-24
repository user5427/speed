namespace SpeedReaderAPI.DTOs.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Attributes;
using SpeedReaderAPI.Constants;

public record QuestionRequest
{
    [Required(ErrorMessage = "Question is required.")]
    [StringLength(ValidationConstants.MaxQuestionTextLength,
                MinimumLength = ValidationConstants.MinQuestionTextLength,
                ErrorMessage = "Question must be between {2} and {1} characters.")]
    public string Question { get; init; }

    [AnswerChoicesValidation]
    public string[] AnswerChoices { get; init; }

    [Required(ErrorMessage = "Correct answer choice is required.")]
    [StringLength(ValidationConstants.MaxAnswerChoiceLength,
        ErrorMessage = "Correct answer choice cannot exceed {1} characters.")]
    public string CorrectAnswerChoice { get; init; }

    public QuestionRequest(string question, string[] answerChoices, string correctAnswerChoice)
    {
        Question = question;
        AnswerChoices = answerChoices;
        CorrectAnswerChoice = correctAnswerChoice;
    }
}
