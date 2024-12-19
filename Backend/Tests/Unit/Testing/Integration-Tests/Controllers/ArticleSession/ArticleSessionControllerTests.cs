using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services;
using System.Linq;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.ArticleSession.Responses;
using SpeedReaderAPI.DTOs.ArticleSession.Requests;
using SpeedReaderAPI.DTOs.ParagraphSession.Requests;

namespace Unit;

public class ArticleSessionsControllerTests : IClassFixture<PlaygroundApplicationFixture>
{
    private readonly PlaygroundApplicationFixture _fixture;
    private readonly HttpClient _client;
    private int _articleId;
    private User _user;
    private readonly ITokenService _tokenService;

    public ArticleSessionsControllerTests(PlaygroundApplicationFixture fixture)
    {
        _fixture = fixture;
        _client = fixture.CreateClient();
        ensureDatabaseIsPrepared();
        
        var configuration = _fixture.Services.GetRequiredService<Microsoft.Extensions.Configuration.IConfiguration>();
        _tokenService = new TokenService(configuration);
    }

    private void ensureDatabaseIsPrepared()
    {
        var scope = _fixture.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();

        // Ensure database is prepared synchronously
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        DBHelperMethods.SeedInitialData(context);
        _user = DBHelperMethods.getUser(context);
        _articleId = DBHelperMethods.GetFirstArticleId(context);
    }

    [Fact]
    public async Task GetMyArticleSessions_ValidQuery_ReturnsSessions()
    {
        // Arrange
        var token = _tokenService.CreateToken(_user);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        // Act
        var response = await _client.GetAsync($"/api/article-sessions/me");
        var result = await response.Content.ReadFromJsonAsync<PageResponse<ArticleSessionResponse>>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(result);
        Assert.Equal(1, result.Count); 
    }

}
