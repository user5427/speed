using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class DbArticleRepository : IDefaultRepository<Article>
{
    private readonly ApplicationContext _context;

    public DbArticleRepository(ApplicationContext context)
    {
        _context = context;
    }
    public long Count() => _context.Article.Count();

    public Article? FindById(int? id) => _context.Article.Include(a => a.User).FirstOrDefault(a => a.Id == id);


    public void Add(Article article) => _context.Article.Add(article);

    public void Remove(Article article) => _context.Article.Remove(article);

    public List<Article> GetPaged(int skip, int take) => _context.Article.Skip(skip).Take(take).Include(a => a.User).ToList();
}
