namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.Entities;

public interface IArticleService
{
    // CREATE
    Object CreateArticle(CreateArticleRequest request);

    // READ
    Object GetAllArticles(int pageIndex, int pageSize);
    Object GetArticleById(int id);

    // UPDATE
    Object UpdateArticle(CreateArticleRequest request);

    // DELETE
    void DeleteArticle(int articleId);
}
