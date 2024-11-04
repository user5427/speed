using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Moq;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;

namespace Unit;

public class ArticleControllerTests : IClassFixture<PlaygroundApplication>
{
    private readonly HttpClient _client;

    public ArticleControllerTests(PlaygroundApplication factory)
    {
        _client = factory.CreateClient();
    }

    public async Task<int> CreateArticle(string title = "Test Article", string categoryTitle = "Test Category") {
        // Act
        var request = new ArticleCreateRequest(
            Title: title,
            CategoryTitle: categoryTitle
        );

        var createResponse = await _client.PostAsJsonAsync("/api/articles", request);
        var createdArticle = await createResponse.Content.ReadFromJsonAsync<ArticleResponse>();
        Assert.NotNull(createdArticle);
        int articleId = createdArticle.Id;  // Replace with a valid article ID for the test
        return articleId;
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
        // Arrange
        var articleId = await CreateArticle();
        
        // Act
        var response = await _client.GetAsync($"/api/articles/{articleId}");
        var article = await response.Content.ReadFromJsonAsync<ArticleResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(article);
        Assert.Equal(articleId, article?.Id);
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
        var articleId = await CreateArticle();
        var request = new ArticleUpdateRequest(
            Title: "Updated Title",
            CategoryTitle: "Updated Category",
            ParagraphIds: null
        );

        // Act
        var response = await _client.PutAsJsonAsync($"/api/articles/{articleId}", request);
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
        // Arrange
        int articleId = 1;  // Replace with a valid article ID for the test

        // Act
        var response = await _client.DeleteAsync($"/api/articles/{articleId}");

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
        // Arrange
        await CreateArticle("Test Article 1", "Test Category");
        // Act
        var response = await _client.GetAsync($"/api/articles/search?Search=Test");
        var articlePage = await response.Content.ReadFromJsonAsync<ArticlePageResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(articlePage);
        Assert.NotNull(articlePage.Articles);
        Assert.NotEmpty(articlePage.Articles);

    }
    
      
}
