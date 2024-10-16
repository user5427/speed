namespace SpeedReaderAPI.DTOs.Paragraph.Responses;

public record ParagraphResponse(
	string Title,
	int ArticleId, 
	int Id, 
	string Text, 
	List<int>? QuestionIds,
  string? ImageFileName
);
