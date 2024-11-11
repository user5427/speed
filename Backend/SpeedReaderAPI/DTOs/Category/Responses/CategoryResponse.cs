public record CategoryResponse
(
    int Id,
    string Title,
    List<int>? ArticleIds,
    string? ImageFileName
);