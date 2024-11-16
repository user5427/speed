namespace SpeedReaderAPI.DTOs.ArticleSession.Responses;

using SpeedReaderAPI.DTOs.ParagraphSession;

public record ArticleSessionResponse(
    long Id,
    int ArticleId,
    DateTime Time,
    ParagraphSessionDto[] Paragraphs
);