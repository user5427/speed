using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.DTOs.Responses;
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

    
    // GET

    public async Task<Object> GetAllArticlesAsync(int pageIndex = 0, int pageSize = 10)
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

    // GET BY ID

    public async Task<Object> GetArticleByIdAsync(int id)
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

    // CREATE
    public async Task<Object> CreateArticleAsync(ArticleRequest request)
    {
        // (validate category)
        try
        {
            var postedArticle = _mapper.Map<Article>(request);

            await _context.Article.AddAsync(postedArticle);
            await _context.SaveChangesAsync();

            var responseData = _mapper.Map<ArticleLongResponse>(postedArticle);

            return responseData;
        }
        catch (Exception)
        {

            throw;
        }

    }

    // UPDATE

    public async Task<Object> UpdateArticleAsync(ArticleRequest request)
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

            await _context.SaveChangesAsync();

            var responseData = _mapper.Map<ArticleLongResponse>(articleFound);
            return responseData;
        }
        catch (Exception)
        {

            throw;
        }
    }

    // DELETE
    public async Task DeleteArticleAsync(int articleId)
    {
        try
        {
            var articleFound = _context.Article.Where(x => x.Id == articleId).FirstOrDefault();

            if (articleFound == null)
            {
                throw new Exception("Article not found!");
            }

            _context.Article.Remove(articleFound);
            await _context.SaveChangesAsync();
        }
        catch (Exception)
        {

            throw;
        }
    }
}
