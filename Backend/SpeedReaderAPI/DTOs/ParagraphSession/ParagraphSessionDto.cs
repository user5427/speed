namespace SpeedReaderAPI.DTOs.ParagraphSession;

public record ParagraphSessionDto
(
    int Id,
    int ParagraphId,
    int Wpm,
    int CorrectCount,
    int TotalCount
);