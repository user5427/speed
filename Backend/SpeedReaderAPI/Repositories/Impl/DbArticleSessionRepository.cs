using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class DbArticleSessionRepository : IDefaultRepository<ArticleSession>
{
    private readonly ApplicationContext _context;

    public DbArticleSessionRepository(ApplicationContext context)
    {
        _context = context;
    }

    public void Add(ArticleSession entity) => _context.ArticleSession.Add(entity);

    public long Count() => _context.ArticleSession.Count();

    public ArticleSession? FindById(int? id) => _context.ArticleSession.FirstOrDefault(a => a.Id == id);

    public List<ArticleSession> GetPaged(int skip, int take) => _context.ArticleSession.Skip(skip).Take(take).ToList();

    public void Remove(ArticleSession entity) => _context.ArticleSession.Remove(entity);
}
