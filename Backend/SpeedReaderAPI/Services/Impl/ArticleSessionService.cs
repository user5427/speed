namespace SpeedReaderAPI.Services.Impl;

using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.ArticleSession.Requests;
using SpeedReaderAPI.DTOs.ArticleSession.Responses;
using SpeedReaderAPI.Entities;

public class ArticleSessionService : IArticleSessionService
{
    private readonly CombinedRepositories _context;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;
    
    // Production constructor
    public ArticleSessionService(ApplicationContext context, IUserService userService, IMapper mapper)
    {
        _context = new CombinedRepositories(context);
        _mapper = mapper;
        _userService = userService;
    }

    public async Task<ArticleSessionResponse> CreateArticleSession(ArticleSessionCreateRequest request)
    {
        User? user = _userService.GetAuthenticatedUser();
        if (user == null) 
            throw new Exception("Illegal state");

        throw new NotImplementedException();
    }
}
