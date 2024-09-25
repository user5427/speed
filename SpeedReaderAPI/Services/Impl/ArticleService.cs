using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.DTOs.Responses;
using SpeedReaderAPI.Entities;
namespace SpeedReaderAPI.Services;


public class ArticleService : IArticleService
{

    private readonly ApplicationContext _context;

    public ArticleService(ApplicationContext context)
    {
        _context = context;
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

    // GET

    public async Task<ICollection<ArticleShortResponse>> GetAllArticlesAsync()
    {
        return await _context.Article
            .Select(article => article.ToShortResponse())
            .ToListAsync();
    }

    public async Task<ArticleLongResponse> GetArticleByIdAsync(int id)
    {
        var article = await _context.Article
                            .Include(a => a.Paragraphs)
                                .ThenInclude(p => p.Questions)
                            .FirstOrDefaultAsync(a => a.Id == id)
                ?? throw new Exception("Article not found!");

        return article.ToLongResponse();
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
