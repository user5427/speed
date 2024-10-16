namespace SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.Entities;

public interface IArticleService
{
    ArticleResponse CreateArticle(ArticleCreateRequest request);
    ArticlePageResponse GetArticles(QueryParameters queryParameters);
    PageResponse<ArticleResponse> SearchArticles(string search, QueryParameters queryParameters);
    ArticleResponse GetArticleById(int id);
    ArticleResponse UpdateArticle(int id, ArticleUpdateRequest request);
    void DeleteArticle(int articleId);
}
