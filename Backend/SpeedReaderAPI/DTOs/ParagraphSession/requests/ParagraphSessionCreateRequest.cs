namespace SpeedReaderAPI.DTOs.ParagraphSession.Requests;
using System.ComponentModel.DataAnnotations;

public record ParagraphSessionCreateRequest
(
    [Required(ErrorMessage = "Paragraph id is required.")]
    int? ParagraphId,
    
    [Required(ErrorMessage = "Duration is required.")]
    int? Duration,

    [Required(ErrorMessage = "Wpm is required.")]
    int? Wpm,

    [Required(ErrorMessage = "Correct question count is required.")]
    int? CorrectCount
);