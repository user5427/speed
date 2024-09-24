namespace SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.DTOs.Responses;
using SpeedReaderAPI.Entities;

public interface IArticleService
{
    // CREATE
    Task<Article> CreateArticleAsync(int? categoryId, ArticleRequest request);

    // READ
    Task<Object> GetAllArticlesAsync();
    Task<Object> GetArticleByIdAsync(int id);

    // UPDATE
    Task<Object> UpdateArticleAsync(int articleId, ArticleRequest request);

    // DELETE
    Task DeleteArticleAsync(int articleId);
}
