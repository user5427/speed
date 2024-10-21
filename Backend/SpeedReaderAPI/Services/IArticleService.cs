namespace SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.Entities;

public interface IArticleService : IServiceWithImage<ArticleResponse>
{
    ArticleResponse CreateArticle(ArticleCreateRequest request);
    ArticlePageResponse GetArticles(QueryParameters queryParameters);
    PageResponse<ArticleResponse> SearchArticles(QueryParameters queryParameters);
    ArticleResponse GetArticleById(int id);
    ArticleResponse UpdateArticle(int id, ArticleUpdateRequest request);
    void DeleteArticle(int articleId);
}
