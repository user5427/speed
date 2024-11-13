namespace SpeedReaderAPI.DTOs.Article.Responses;

public record ArticleResponse(
    string Title,
    int Id,
    string? CategoryTitle,
    List<int>? ParagraphIds,
    List<int>? CategoryIds,
    string? ImageFileName
);
