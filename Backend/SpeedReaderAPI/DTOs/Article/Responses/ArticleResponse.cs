namespace SpeedReaderAPI.DTOs.Article.Responses;

public record ArticleResponse(
    string Title,
    int Id,
    string? CategoryTitle,
    // string? Author,
    string? Publisher,
    string? Url,
    string? Language,
    List<int>? ParagraphIds,
    List<int>? CategoryIds,
    string? ImageFileName
);
