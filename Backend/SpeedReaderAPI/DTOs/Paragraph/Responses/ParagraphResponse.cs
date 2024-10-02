namespace SpeedReaderAPI.DTOs.Paragraph.Responses;

public record ParagraphResponse(
	int ArticleId, 
	int Id, string 
	Text, 
	int? NextParagraphId, 
	List<int>? QuestionIds
	);
