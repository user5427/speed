
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;

public class CombinedRepositories : ICombinedRepository {
    private readonly ApplicationContext? _context;
    public readonly IDefaultRepository<Article> Article;
    public readonly IDefaultRepository<Paragraph> Paragraph;
    public readonly IDefaultRepository<Question> Question;
    public readonly IDbUserRepository User;
    public readonly IDefaultRepository<ArticleSession> ArticleSession;

    
    public CombinedRepositories(ApplicationContext context)
    {
        _context = context;
        Article = new DbArticleRepository(context);
        Paragraph = new DbParagraphRepository(context);
        Question = new DbQuestionRepository(context);
        User = new DbUserRepository(context);
        ArticleSession = new DbArticleSessionRepository(context);
    }

    public void SaveChanges() {
        if (_context == null) return; // when repository is not used with DB context
        _context.SaveChanges();
    }

    public async Task SaveChangesAsync() {
        if (_context == null) return; // when repository is not used with DB context
        await _context.SaveChangesAsync();
    }

}