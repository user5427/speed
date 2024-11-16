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
    private readonly IUserService _userService;
    private readonly IParagraphSessionService _paragraphSessionService;
    private readonly IMapper _mapper;

    // Production constructor
    public ArticleSessionService(ApplicationContext context, IUserService userService, IParagraphSessionService paragraphSessionService, IMapper mapper)
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
            User? user = _userService.GetAuthenticatedUser();
            if (user == null)
                throw new UnauthorizedAccessException("User is not authenticated.");

            Article? articleFound = _context.Article.FindById(request.ArticleId);
            if (articleFound == null)
                throw new ResourceNotFoundException($"Article with ID {request.ArticleId} not found.");

            ArticleSession session = new ArticleSession
            {
                UserId = user.Id,
                ArticleId = articleFound.Id,
                Time = DateTime.UtcNow,
            };

            _context.ArticleSession.Add(session);
            await _context.SaveChangesAsync();

            ParagraphSessionDto[] paragraphSessionDtos = await _paragraphSessionService.CreateParagraphSessions(articleFound, session, request.ParagraphSessions!);

            return new ArticleSessionResponse(session.Id,
                session.ArticleId,
                session.Time,
                paragraphSessionDtos
            );
        });
    }
}
