namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs.Question.Responses;

public interface IUserService
{
    UserInfoResponse GetMyInfo();
}