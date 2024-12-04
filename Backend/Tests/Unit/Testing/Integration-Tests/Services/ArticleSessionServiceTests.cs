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
    private readonly ArticleService _articleService;
    private readonly ParagraphService _paragraphService;
    private readonly QuestionService _questionService;
    private readonly TokenService _tokenService;
    private readonly AuthService _authService;

    private readonly User user;
    private readonly long _articleId;
    private readonly long _paragraphId;
    public ArticleSessionServiceTests()
    {
        var context = ContextCreator.CreateIsolatedContext();

        DBHelperMethods.SeedInitialData(context);
        DBHelperMethods.SeedUserData(context);
        _articleId = DBHelperMethods.GetFirstArticleId(context);
        _paragraphId = DBHelperMethods.GetFirstParagraphId(context);

        // Set up AutoMapper with the actual mappings
        var mapperConfig = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<MappingProfiles>(); // Replace with your actual AutoMapper profile(s)
        });
        _mapper = mapperConfig.CreateMapper();

        // Create the ImageService
        _imageService = new ImageService();
        // _mockMapper.Object

        _questionService = new QuestionService(context, _mapper, _imageService);

        _paragraphService = new ParagraphService(context, _mapper, _imageService, _questionService);

        // Initialize ArticleService with mocks and context
        _articleService = new ArticleService(context, _mapper,
                                             _imageService,
                                             _paragraphService);
                                             
         _paragraphSessionService = new ParagraphSessionService(context, _mapper);


        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string>
            {
                { "Jwt:Key", "your_secret_key_here_your_secret_key_here" },
                { "Jwt:Issuer", "your_issuer" },
                { "Jwt:Audience", "your_audience" }
            })
            .Build();

        _tokenService = new TokenService(configuration);


        user = DBHelperMethods.getUser(context);

        var httpContext = new DefaultHttpContext();
        httpContext.User = new ClaimsPrincipal(new ClaimsIdentity(
        [
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
        ]));
         var contextAccessor = new HttpContextAccessor { HttpContext = httpContext };
        _authService = new AuthService(context, _mapper, _tokenService, contextAccessor);
        _articleSessionService = new ArticleSessionService(context, _authService, _paragraphSessionService, _mapper);  
        
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
        Assert.Equal(1, result.Items.Count);   
        var firstItem = result.Items.First();
        Assert.Equal(_articleId, firstItem.ArticleId);  
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