using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;
namespace SpeedReaderAPI.Services.Impl;
using SpeedReaderAPI.DTOs.Question.Responses;

public class UserService : IUserService
{
    private readonly IMapper _mapper;
    private readonly IAuthService _authService;
    public UserService(ApplicationContext context, IMapper mapper,
        IAuthService authService)
    {
        _authService = authService;
        _mapper = mapper;
    }

    public UserInfoResponse GetMyInfo()
    {
        User? user = _authService.GetAuthenticatedUser();
        if (user == null)
            throw new UnauthorizedAccessException("User is not authenticated.");

        double averageWpm = user.SecondsRead > 0 ? Math.Round(user.WordsRead / (user.SecondsRead / 60D)) : 0;

        return new UserInfoResponse(
           user.Id,
           user.Username,
           averageWpm,
           user.WordsRead,
           user.SecondsRead / 60D,
           user.CorrectQuestions,
           user.TotalQuestions,
           user.ArticlesCountRead
        );
    }
}