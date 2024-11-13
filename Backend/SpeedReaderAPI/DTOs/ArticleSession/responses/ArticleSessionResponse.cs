namespace SpeedReaderAPI.DTOs.ArticleSession.Responses;

using SpeedReaderAPI.DTOs.ParagraphSession;

public record ArticleSessionResponse(
    int Id,
    DateTime Time,
    ParagraphSessionDto[] Paragraphs
);