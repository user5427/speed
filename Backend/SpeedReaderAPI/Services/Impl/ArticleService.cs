using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.Entities;
namespace SpeedReaderAPI.Services;


public class ArticleService : IArticleService
{

    private readonly ApplicationContext _context;
    private readonly IMapper _mapper;

    public ArticleService(ApplicationContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    public Object GetAllArticles(int pageIndex = 0, int pageSize = 10)
    {
        try
        {
            var articleCount = _context.Article.Count();
            var articleList = _mapper.Map<List<ArticleShortResponse>>(_context.Article.Skip(pageIndex * pageSize).Take(pageSize).ToList());
            return new
            {
                Articles = articleCount,
                ArticleList = articleList
            };

        }
        catch (Exception)
        {

            throw;
        }
    }

    public Object GetArticleById(int id)
    {
        try
        {
            var article = _mapper.Map<ArticleLongResponse>(_context.Article.FirstOrDefault(a => a.Id == id));
            return article;
        }
        catch (Exception)
        {

            throw;
        }

    }

    public Object CreateArticle(CreateArticleRequest request)
    {
     
        try
        {
            var postedArticle = _mapper.Map<Article>(request);

            _context.Article.Add(postedArticle);
            _context.SaveChanges();

            var responseData = _mapper.Map<ArticleLongResponse>(postedArticle);

            return responseData;
        }
        catch (Exception ex)
        {
       
            throw;
        }

    }



    public Object UpdateArticle(CreateArticleRequest request)
    {
        try
        {
            var postedArticle = _mapper.Map<Article>(request);

            var articleFound = _context.Article.Where(x => x.Id == postedArticle.Id).FirstOrDefault();
            if (articleFound == null)
            {
                throw new Exception("Article not found!");
            }

            articleFound.Title = postedArticle.Title;
            articleFound.Paragraphs = postedArticle.Paragraphs;
            articleFound.CategoryTitle = postedArticle.CategoryTitle;

            _context.SaveChanges();

            var responseData = _mapper.Map<ArticleLongResponse>(articleFound);
            return responseData;
        }
        catch (Exception)
        {

            throw;
        }
    }

  
    public void DeleteArticle(int articleId)
    {
        try
        {
            var articleFound = _context.Article.Where(x => x.Id == articleId).FirstOrDefault();

            if (articleFound == null)
            {
                throw new Exception("Article not found!");
            }

            _context.Article.Remove(articleFound);
            _context.SaveChanges();
        }
        catch (Exception)
        {

            throw;
        }
    }
}
