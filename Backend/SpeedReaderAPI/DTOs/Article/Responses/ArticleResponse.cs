namespace SpeedReaderAPI.DTOs.Article.Responses;

public record ArticleResponse(
    string Title,
    int Id,
    string? CategoryTitle,
    List<int>? ParagraphIds,
    string? ImageFileName
);
