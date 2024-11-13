namespace SpeedReaderAPI.DTOs.ArticleSession.Responses;

using SpeedReaderAPI.DTOs.ParagraphSession;

public record ArticleSessionResponse(
    long Id,
    DateTime Time,
    ParagraphSessionDto[] Paragraphs
);