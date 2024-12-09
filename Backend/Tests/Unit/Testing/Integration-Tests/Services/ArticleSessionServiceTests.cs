using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using SpeedReaderAPI;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services.Impl;
using Unit;

public class ArticleSessionServiceTests
{
    private readonly PlaygroundApplicationFixture _fixture;

    private readonly ContextCreator _contextCreator;
    private readonly IMapper _mapper;
    private readonly ArticleSessionService _articleSessionService;
    private readonly ParagraphSessionService _paragraphSessionService;
    private readonly ImageService _imageService;

    private readonly User _user;
    public ArticleSessionServiceTests()
    {
        var context = ContextCreator.CreateIsolatedContext();


        // Set up AutoMapper with the actual mappings
        var mapperConfig = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<MappingProfiles>(); // Replace with your actual AutoMapper profile(s)
        });
        _mapper = mapperConfig.CreateMapper();

        // Create the ImageService
        _imageService = new ImageService();
        // _mockMapper.Object

        var inMemorySettings = new Dictionary<string, string>
        {
            { "Jwt:Key", "testkey" },
            { "Jwt:Issuer", "testissuer" },
            { "Jwt:Audience", "testaudience" }
        };

        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build();

        TokenService tokenService = new TokenService(configuration);

        DBHelperMethods.SeedInitialData(context);
        _user = DBHelperMethods.getUser(context);

        var httpContext = new DefaultHttpContext();
        httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(
        [
            new Claim(ClaimTypes.NameIdentifier, _user.Id.ToString()),
            new Claim(ClaimTypes.Email, _user.Email),
            new Claim(ClaimTypes.Role, _user.Role.ToString()),
        ]));

        var contextAccessor = new HttpContextAccessor { HttpContext = httpContext };
        AuthService authService = new AuthService(context, _mapper, tokenService, contextAccessor);

        QuestionService questionService = new QuestionService(context, _mapper, _imageService, authService);

        ParagraphService paragraphService = new ParagraphService(context, _mapper, _imageService, questionService, authService);

        ArticleService articleService = new ArticleService(context, _mapper, _imageService, paragraphService, authService);

        _paragraphSessionService = new ParagraphSessionService(context, _mapper);
        _articleSessionService = new ArticleSessionService(context, authService, _paragraphSessionService, _mapper);
    }

    [Fact]
    public void GetAllByAuthenticatedUser_ShouldReturnValidResponse_WhenUserIsAuthenticated()
    {
        // Arrange
        var queryParameters = new QueryParameters { PageNumber = 1, PageSize = 10 };

        // Act
        var result = _articleSessionService.GetAllByAuthenticatedUser(queryParameters);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(1, result.Count);
        Assert.Single(result.Items);
        var firstItem = result.Items.First();
        Assert.Equal(2, firstItem.ArticleId);
    }

    // [Fact(DisplayName = "Article session creation succeeds with valid input")]
    // public async Task CreateArticleSession_ValidInput_Succeeds()
    // {

    //     // Arrange
    //    var request = new ArticleSessionCreateRequest
    //     (
    //         ArticleId: (int?)_articleId,
    //         ParagraphSessions:
    //         [
    //             new ParagraphSessionCreateRequest
    //             (
    //                 ParagraphId: (int?)_paragraphId, 
    //                 Wpm: 200,
    //                 Duration: 20,
    //                 CorrectQuestionCount: 1
    //             )
    //         ]
    //     );

    //     // Act
    //     var response = await _articleSessionService.CreateArticleSession(request);

    //     // Assert
    //     Assert.NotNull(response);
    // }

}