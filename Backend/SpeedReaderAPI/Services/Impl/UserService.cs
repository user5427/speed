using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;
namespace SpeedReaderAPI.Services.Impl;
using SpeedReaderAPI.DTOs.Question.Responses;

public class UserService : IUserService
{
    private readonly IAuthService _authService;
    public UserService(ApplicationContext context,
        IAuthService authService)
    {
        _authService = authService;
    }

    public UserInfoResponse GetMyInfo()
    {
        User? user = _authService.GetAuthenticatedUser();
        if (user == null)
            throw new UnauthorizedAccessException("User is not authenticated.");


        return new UserInfoResponse(
           user.Id,
           user.Username,
           user.WordsRead,
           user.SecondsRead / 60D,
           user.CorrectQuestions,
           user.TotalQuestions,
           user.ArticlesCountRead
        );
    }
}