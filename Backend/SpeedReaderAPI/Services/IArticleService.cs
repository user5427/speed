namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.Entities;

public interface IArticleService
{
  
    Object CreateArticle(CreateArticleRequest request);

    Object GetAllArticles(int pageIndex, int pageSize);
    Object GetArticleById(int id);

    Object UpdateArticle(CreateArticleRequest request);


    void DeleteArticle(int articleId);
}
