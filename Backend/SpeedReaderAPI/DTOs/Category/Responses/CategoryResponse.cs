public record CategoryResponse
(
    int Id,
    string Title,
    string Text,
    List<int>? ArticleIds,
    string? ImageFileName
);