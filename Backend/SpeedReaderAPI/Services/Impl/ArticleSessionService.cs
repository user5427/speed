namespace SpeedReaderAPI.Services.Impl;

using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.ArticleSession.Requests;
using SpeedReaderAPI.DTOs.ArticleSession.Responses;
using SpeedReaderAPI.DTOs.ParagraphSession;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;

public class ArticleSessionService : IArticleSessionService
{
    private readonly CombinedRepositories _context;
    private readonly IAuthService _userService;
    private readonly IParagraphSessionService _paragraphSessionService;
    private readonly IMapper _mapper;
    private const double SECONDS_PER_MIN = 60D;

    // Production constructor
    public ArticleSessionService(ApplicationContext context, IAuthService userService, IParagraphSessionService paragraphSessionService, IMapper mapper)
    {
        _context = new CombinedRepositories(context);
        _mapper = mapper;
        _userService = userService;
        _paragraphSessionService = paragraphSessionService;
    }

    public async Task<ArticleSessionResponse> CreateArticleSession(ArticleSessionCreateRequest request)
    {
        // Transactional
        return await _context.ExecuteTransactionAsync(async () =>
        {
            User? user = _userService.GetAuthenticatedUser() ?? throw new UnauthorizedAccessException("User is not authenticated.");
            Article? articleFound = _context.Article.FindById(request.ArticleId) ?? throw new ResourceNotFoundException($"Article with ID {request.ArticleId} not found.");
            ArticleSession session = new ArticleSession
            {
                UserId = user.Id,
                ArticleId = articleFound.Id,
                Time = DateTime.UtcNow,
            };
            _context.ArticleSession.Add(session);
            await _context.SaveChangesAsync();
            ParagraphSessionDto[] paragraphSessionDtos = await _paragraphSessionService.CreateParagraphSessions(articleFound, session, request.ParagraphSessions!);
            double totalWords = (double)request.ParagraphSessions!.Sum(s => s.Wpm! * s.Duration! / SECONDS_PER_MIN)!;
            int totalDurationInSeconds = request.ParagraphSessions!.Sum(s => s.Duration ?? 0);
            int sessionWpm = (int)Math.Round(totalWords / (totalDurationInSeconds / SECONDS_PER_MIN));
            session.TotalQuestionCount = request.ParagraphSessions!.Sum(s => _context.Paragraph.FindById(s.ParagraphId)!.QuestionIds.Count);
            session.CorrectQuestionCount = request.ParagraphSessions!.Sum(s => s.CorrectQuestionCount ?? 0);
            session.Wpm = sessionWpm;
            await _context.SaveChangesAsync();
            return CreateArticleSessionResponse(session, paragraphSessionDtos);
        });
    }
    private ArticleSessionResponse CreateArticleSessionResponse(ArticleSession session, ParagraphSessionDto[] paragraphSessions)
    {
        return new ArticleSessionResponse(session.Id,
                session.ArticleId,
                session.Wpm,
                session.CorrectQuestionCount,
                session.TotalQuestionCount,
                session.Time,
                paragraphSessions
            );
    }
}
