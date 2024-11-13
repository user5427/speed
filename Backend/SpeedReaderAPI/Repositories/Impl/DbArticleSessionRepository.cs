using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class DbArticleSessionRepository : IDefaultRepository<ArticleSession>
{
    private readonly ApplicationContext _context;

    public DbArticleSessionRepository(ApplicationContext context)
    {
        _context = context;
    }

    public void Add(ArticleSession entity)
    {
        throw new NotImplementedException();
    }

    public long Count()
    {
        throw new NotImplementedException();
    }

    public ArticleSession? FindById(int? id)
    {
        throw new NotImplementedException();
    }

    public List<ArticleSession> GetPaged(int skip, int take)
    {
        throw new NotImplementedException();
    }

    public void Remove(ArticleSession entity)
    {
        throw new NotImplementedException();
    }
}
