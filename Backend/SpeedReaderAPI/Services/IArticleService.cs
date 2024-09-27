namespace SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;

public interface IArticleService
{
    ArticleResponse CreateArticle(ArticleCreateRequest request);
    ArticlePageResponse GetArticles(QueryParameters queryParameters);
    ArticleResponse GetArticleById(int id);
    ArticleResponse UpdateArticle(int id, ArticleUpdateRequest request);
    void DeleteArticle(int articleId);
}
