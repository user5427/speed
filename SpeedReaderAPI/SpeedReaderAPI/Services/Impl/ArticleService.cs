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

    public async Task<ArticleLongResponse> GetArticleByIdAsync(int id)
    {
        var article = await _context.Article
                            .Include(a => a.Paragraphs)
                                .ThenInclude(p => p.Questions)
                            .FirstOrDefaultAsync(a => a.Id == id)
                ?? throw new Exception("Article not found!");

        return article.ToLongResponse();
    }

    // CREATE
    public async Task<Article> CreateArticleAsync(int? categoryId, ArticleRequest request)
    {
        // (validate category)    

        var article = new Article { Title = request.Title };
        await _context.Article.AddAsync(article);
        await _context.SaveChangesAsync();
        return article;
    }

    // UPDATE

    public async Task<Article> UpdateArticleAsync(int articleId, ArticleRequest request)
    {
        var article = await _context.Article.FindAsync(articleId)
                        ?? throw new Exception("Article not found!");

        article.Title = request.Title;

        await _context.SaveChangesAsync();
        return article;
    }

    // DELETE
    public async Task DeleteArticleAsync(int articleId)
    {
        var article = await _context.Article.FindAsync(articleId); ;
        if (article == null) return;

        _context.Article.Remove(article);
        await _context.SaveChangesAsync();
    }
}
