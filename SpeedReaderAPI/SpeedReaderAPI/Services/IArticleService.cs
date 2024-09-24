namespace SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.DTOs.Responses;
using SpeedReaderAPI.Entities;

public interface IArticleService
{
    // CREATE
    Task<Object> CreateArticleAsync(ArticleRequest request);

    // READ
    Task<Object> GetAllArticlesAsync(int pageIndex, int pageSize);
    Task<Object> GetArticleByIdAsync(int id);

    // UPDATE
    Task<Object> UpdateArticleAsync(ArticleRequest request);

    // DELETE
    Task DeleteArticleAsync(int articleId);
}
