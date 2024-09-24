namespace SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.DTOs.Responses;
using SpeedReaderAPI.Entities;

public interface IArticleService
{
    // CREATE
    Task<Article> CreateArticleAsync(int? categoryId, ArticleRequest request);

    // READ
    Task<ICollection<ArticleShortResponse>> GetAllArticlesAsync();
    Task<ArticleLongResponse> GetArticleByIdAsync(int id);

    // UPDATE
    Task<Article> UpdateArticleAsync(int articleId, ArticleRequest request);

    // DELETE
    Task DeleteArticleAsync(int articleId);
}
