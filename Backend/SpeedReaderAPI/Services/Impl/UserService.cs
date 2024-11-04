using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Auth.Requests;
using SpeedReaderAPI.DTOs.Auth.Responses;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;
namespace SpeedReaderAPI.Services.Impl;
using System.Security.Claims;


public class UserService : IUserService
{
    
    private readonly ApplicationContext _context;
    private readonly ITokenService _tokenService;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IMapper _mapper;
    public UserService(ApplicationContext context, IMapper mapper,
        ITokenService tokenService,
        IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
        _context = context;
        _mapper = mapper;
        _tokenService = tokenService;
    }
    public LoginResponse Login(LoginRequest request)
    {
        var user = _context.User.Where(x => request.Email == x.Email).FirstOrDefault();

        if (user == null)
        {
            throw new InvalidCredentialsException(); 
        }
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password)) {
            throw new InvalidCredentialsException();
        }
        var token = _tokenService.CreateToken(user);
        
        return new LoginResponse {
            Id = user.Id,
            Username = user.Email,
            Token = token
        };
    }

    public void Register(RegisterRequest request)
    {
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

        if (_context.User.Where(u => u.Email == request.Email).FirstOrDefault() != null) {
            throw new DuplicateEmailException();
        }

        var createdUser = new User
        {
            Username = request.Username,
            Email = request.Email,
            Password = hashedPassword,
            Role = Role.USER
        };

        _context.User.Add(createdUser);
        _context.SaveChanges();
    }

    public User? GetAuthenticatedUser() {
        string? userIdClaim = _httpContextAccessor
            .HttpContext
            ?.User
            .Claims
            .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
            ?.Value;
        
        if(userIdClaim == null)
        {
            return null;
        }

        if (!long.TryParse(userIdClaim, out long userId))
        {
            throw new InvalidOperationException("User ID claim is not a valid long.");
        }
        
        User? user = _context.User.Where(u => u.Id == userId).FirstOrDefault();
        return user;
    }
}