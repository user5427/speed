namespace SpeedReaderAPI.DTOs.Article.Responses;

public record ArticlePageResponse(long Lount, ICollection<ArticleResponse> Articles);
