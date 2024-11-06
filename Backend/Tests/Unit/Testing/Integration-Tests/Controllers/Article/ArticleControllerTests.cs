using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Moq;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.Entities;

namespace Unit;

public class ArticleControllerTests : IClassFixture<PlaygroundApplicationFixture>
{
    private readonly PlaygroundApplicationFixture _fixture;
    private readonly HttpClient _client;
    private int _articleId;

    public ArticleControllerTests(PlaygroundApplicationFixture fixture)
    {
        _fixture = fixture;
        _client = fixture.CreateClient();
        _articleId = -1;
        ensureDatabaseIsPrepared();
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
        _articleId = DBHelperMethods.GetFirstArticleId(context);
    }

    [Fact]
    public async Task CreateArticle_ValidData_ReturnsCreatedArticle()
    {
        // Arrange
        var request = new ArticleCreateRequest(
            Title: "Test Article",
            CategoryTitle: "Test Category"
        );

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
    public async Task CreateArticle_InvalidData_ReturnsBadRequest()
    {
        // Arrange: Title does not meet the required length constraints
        var request = new ArticleCreateRequest(
            Title: "Sh",  // Assume this is less than ValidationConstants.MinTitleLength
            CategoryTitle: "Test Category"
        );

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
        // Arrange
        var request = new ArticleUpdateRequest(
            Title: "Updated Title",
            CategoryTitle: "Updated Category",
            ParagraphIds: null
        );

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
            Title: "New Title",
            CategoryTitle: "New Category",
            ParagraphIds: null
        );

        // Act
        var response = await _client.PutAsJsonAsync($"/api/articles/{invalidArticleId}", request);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task DeleteArticle_ValidId_ReturnsNoContent()
    {
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

    
}
