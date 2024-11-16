namespace SpeedReaderAPI.DTOs.ParagraphSession;

public record ParagraphSessionDto
(
    long Id,
    int ParagraphId,
    int Wpm,
    int CorrectQuestionCount,
    int TotalQuestionCount
);