namespace SpeedReaderAPI.DTOs.Paragraph.Responses;
public record ParagraphPageResponse(long Count, ICollection<ParagraphResponse> Paragraphs);