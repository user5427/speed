namespace SpeedReaderAPI.DTOs.ParagraphSession.Requests;
using System.ComponentModel.DataAnnotations;

public record ParagraphSessionCreateRequest
(
    [Required(ErrorMessage = "Paragraph id is required.")]
    int? paragraphId,
    
    [Required(ErrorMessage = "Duration is required.")]
    int? duration,

    [Required(ErrorMessage = "Wpm is required.")]
    int? wpm,

    [Required(ErrorMessage = "Correct question count is required.")]
    int? CorrectCount,
);