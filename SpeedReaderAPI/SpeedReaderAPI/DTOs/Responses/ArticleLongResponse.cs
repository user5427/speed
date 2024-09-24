namespace SpeedReaderAPI.DTOs.Responses;

public record ArticleLongResponse(int Id, string? CategoryTitle,
                             string Title, ICollection<ParagraphDTO> Paragraphs);
