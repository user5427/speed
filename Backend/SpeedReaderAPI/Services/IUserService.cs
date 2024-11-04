namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs.Auth.Requests;
using SpeedReaderAPI.DTOs.Auth.Responses;
using SpeedReaderAPI.Entities;

public interface IUserService {
    void Register(RegisterRequest registerRequest);
    LoginResponse Login(LoginRequest loginRequest);
    User? GetAuthenticatedUser();
}