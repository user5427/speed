namespace SpeedReaderAPI.DTOs.Paragraph.Responses;

public record ParagraphResponse(int ArticleId, int Id, string Text, int? nextParagraphId, List<int>? QuestionIds);
