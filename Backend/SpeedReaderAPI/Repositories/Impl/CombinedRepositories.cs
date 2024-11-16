
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class CombinedRepositories : ICombinedRepository
{
    private readonly ApplicationContext? _context;
    public readonly IDefaultRepository<Article> Article;
    public readonly IDefaultRepository<Paragraph> Paragraph;
    public readonly IDefaultRepository<Question> Question;
    public readonly IDbUserRepository User;
    public readonly IDefaultRepository<ArticleSession> ArticleSession;
    public readonly IDefaultRepository<ParagraphSession> ParagraphSession;


    public CombinedRepositories(ApplicationContext context)
    {
        _context = context;
        Article = new DbArticleRepository(context);
        Paragraph = new DbParagraphRepository(context);
        Question = new DbQuestionRepository(context);
        User = new DbUserRepository(context);
        ArticleSession = new DbArticleSessionRepository(context);
        ParagraphSession = new DbParagraphSessionRepository(context);
    }

    public void SaveChanges()
    {
        if (_context == null) return; // when repository is not used with DB context
        _context.SaveChanges();
    }

    public async Task SaveChangesAsync()
    {
        if (_context == null) return; // when repository is not used with DB context
        await _context.SaveChangesAsync();
    }

    // Wrapper to handle methods which need to be transactional
    public async Task<TResult> ExecuteTransactionAsync<TResult>(Func<Task<TResult>> action)
    {
        if (_context == null) throw new Exception("database context is null");

        using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var result = await action();
            await transaction.CommitAsync();
            return result;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

}