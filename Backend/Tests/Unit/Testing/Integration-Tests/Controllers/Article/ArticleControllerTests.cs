using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services;

namespace Unit;

public class ArticleControllerTests : IClassFixture<PlaygroundApplicationFixture>
{
    private readonly PlaygroundApplicationFixture _fixture;
    private readonly HttpClient _client;
    private int _articleId;
    private int _paragraphId;
    private int _categoryId;
    private User _user;
    private readonly ITokenService _tokenService;

    public ArticleControllerTests(PlaygroundApplicationFixture fixture)
    {
        _fixture = fixture;
        _client = fixture.CreateClient();
        _articleId = -1;
        ensureDatabaseIsPrepared();
        
        var configuration = _fixture.Services.GetRequiredService<Microsoft.Extensions.Configuration.IConfiguration>();
        _tokenService = new TokenService(configuration);

        Console.WriteLine("Database prepared Articles " + _articleId);
    }

    private void ensureDatabaseIsPrepared()
    {
        var scope = _fixture.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();

        // Ensure database is prepared synchronously
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        // Call SeedInitialData and ensure it completes before proceeding
        DBHelperMethods.SeedInitialData(context);
        _user = DBHelperMethods.getUser(context);

        _articleId = DBHelperMethods.GetFirstArticleId(context);
        _paragraphId = DBHelperMethods.GetFirstParagraphId(context);
        _categoryId = DBHelperMethods.GetFirstCategoryId(context);
    }

    [Fact]
    public async Task CreateArticle_ValidData_ReturnsCreatedArticle()
    {
        // Arrange
        var request = new ArticleCreateRequest(
            "Test Article", "Test Category", "abcd", "abcd", "abcd",
            null
        );

         var token = _tokenService.CreateToken(_user);

        // Set up the HTTP client with the Authorization header
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        // Act
        var response = await _client.PostAsJsonAsync("/api/articles", request);
        var createdArticle = await response.Content.ReadFromJsonAsync<ArticleResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); // Created
        Assert.NotNull(createdArticle);
        Assert.Equal(request.Title, createdArticle?.Title);
        Assert.Equal(request.CategoryTitle, createdArticle?.CategoryTitle);
    }

    [Fact]
    public async Task CreateArticle_InvalidData_ReturnsUnauthorized()
    {
         var request = new ArticleCreateRequest(
            "Test Article", "Test Category", "abcd", "abcd", "abcd",
            null
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/articles", request);

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task CreateArticle_InvalidData_ReturnsBadRequest()
    {
        // Arrange: Title does not meet the required length constraints
         var request = new ArticleCreateRequest(
            "", "Test Category", "abcd", "abcd", "abcd",
            null
        );

        var token = _tokenService.CreateToken(_user);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        // Act
        var response = await _client.PostAsJsonAsync("/api/articles", request);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetArticle_ValidId_ReturnsArticle()
    {
        // Act
        var response = await _client.GetAsync($"/api/articles/{_articleId}");
        var article = await response.Content.ReadFromJsonAsync<ArticleResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(article);
        Assert.Equal(_articleId, article?.Id);
    }

    [Fact]
    public async Task GetArticle_InvalidId_ReturnsNotFound()
    {
        // Arrange
        int invalidArticleId = 9999;  // Use an ID that does not exist

        // Act
        var response = await _client.GetAsync($"/api/articles/{invalidArticleId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task UpdateArticle_ValidId_UpdatesAndReturnsArticle()
    {
         var request = new ArticleUpdateRequest(
            "Test Article", "Test Category", "abcd", "abcd", "abcd",
            null,
            null
        );

        var token = _tokenService.CreateToken(_user);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        // Act
        var response = await _client.PutAsJsonAsync($"/api/articles/{_articleId}", request);
        var updatedArticle = await response.Content.ReadFromJsonAsync<ArticleResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(updatedArticle);
        Assert.Equal(request.Title, updatedArticle?.Title);
        Assert.Equal(request.CategoryTitle, updatedArticle?.CategoryTitle);
    }

    [Fact]
    public async Task UpdateArticle_InvalidId_ReturnsNotFound()
    {
        // Arrange
        int invalidArticleId = 9999;  // Use an ID that does not exist
        var request = new ArticleUpdateRequest(
            "Test Article", "Test Category", "abcd", "abcd", "abcd",
            new List<int>{_paragraphId},
            new List<int>{_categoryId}
        );

        var token = _tokenService.CreateToken(_user);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        // Act
        var response = await _client.PutAsJsonAsync($"/api/articles/{invalidArticleId}", request);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task DeleteArticle_ValidId_ReturnsNoContent()
    {
        var token = _tokenService.CreateToken(_user);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        
        // Act
        var response = await _client.DeleteAsync($"/api/articles/{_articleId}");
      

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); //NoContent
    }

    [Fact]
    public async Task DeleteArticle_InvalidId_ReturnsNotFound()
    {
        // Arrange
        int invalidArticleId = 9999;  // Use an ID that does not exist

        var token = _tokenService.CreateToken(_user);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        // Act
        var response = await _client.DeleteAsync($"/api/articles/{invalidArticleId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task SearchArticles_ValidQuery_ReturnsArticles()
    {
        // Act
        var response = await _client.GetAsync($"/api/articles/search?Search=Sample");
        var articlePage = await response.Content.ReadFromJsonAsync<PageResponse<ArticleResponse>>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(articlePage);
        Assert.NotEmpty(articlePage.Items);

    }

    

    [Fact]
    public async Task SearchArticles_InvalidQuery_ReturnsEmptyList()
    {
        // Act
        var response = await _client.GetAsync($"/api/articles/search?Search=InvalidQuery");
        var articlePage = await response.Content.ReadFromJsonAsync<PageResponse<ArticleResponse>>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(articlePage);
        Assert.Empty(articlePage.Items);
    }

    [Fact]
    public async Task Count(){
        var resp = await _client.GetAsync($"/api/articles/count");
        Assert.Equal(HttpStatusCode.OK, resp.StatusCode);
    }

    
}
