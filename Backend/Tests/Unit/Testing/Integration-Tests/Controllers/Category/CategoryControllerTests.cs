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

using SpeedReaderAPI.Entities;

namespace Unit;

public class CategoryControllerTests : IClassFixture<PlaygroundApplicationFixture>
{
    private readonly PlaygroundApplicationFixture _fixture;
    private readonly HttpClient _client;
    private int _categoryId;

    public CategoryControllerTests(PlaygroundApplicationFixture fixture)
    {
        _fixture = fixture;
        _client = fixture.CreateClient();
        _categoryId = -1;
        ensureDatabaseIsPrepared();
        Console.WriteLine("Database prepared Categories " + _categoryId);
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
        _categoryId = DBHelperMethods.GetFirstCategoryId(context);
    }

    [Fact]
    public async Task CreateCategory_ValidData_ReturnsCreatedCategory()
    {
        // Arrange
        var request = new CategoryCreateRequest(
            Title: "Test Article",
            Text: "Test Text"
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/category", request);
        var createdArticle = await response.Content.ReadFromJsonAsync<CategoryResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); // Created
        Assert.NotNull(createdArticle);
        Assert.Equal(request.Title, createdArticle?.Title);
        Assert.Equal(request.Text, createdArticle?.Text);
    }

    [Fact]
    public async Task CreateCategory_InvalidData_ReturnsBadRequest()
    {
        // Arrange: Title does not meet the required length constraints
        var request = new CategoryCreateRequest(
            Title: "Sh",  // Assume this is less than ValidationConstants.MinTitleLength
            Text: "TEST STRING"
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/category", request);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetCategory_ValidId_ReturnsCategory()
    {
        // Act
        var response = await _client.GetAsync($"/api/category/{_categoryId}");
        var article = await response.Content.ReadFromJsonAsync<CategoryResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(article);
        Assert.Equal(_categoryId, article?.Id);
    }

    [Fact]
    public async Task GetCategory_InvalidId_ReturnsNotFound()
    {
        // Arrange
        int invalidArticleId = 9999;  // Use an ID that does not exist

        // Act
        var response = await _client.GetAsync($"/api/category/{invalidArticleId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task UpdateCategory_ValidId_UpdatesAndReturnsCategory()
    {
        // Arrange
        var request = new CategoryUpdateRequest(
            Title: "Updated Title",
            Text: "Test Text"
        );

        // Act
        var response = await _client.PutAsJsonAsync($"/api/articles/{_categoryId}", request);
        var updatedArticle = await response.Content.ReadFromJsonAsync<CategoryResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(updatedArticle);
        Assert.Equal(request.Title, updatedArticle?.Title);
        Assert.Equal(request.Text, updatedArticle?.Text);
    }

    [Fact]
    public async Task UpdateCategory_InvalidId_ReturnsNotFound()
    {
        // Arrange
        int invalidArticleId = 9999;  // Use an ID that does not exist
        var request = new CategoryUpdateRequest(
            Title: "New Title",
            Text: "Test Text"
        );

        // Act
        var response = await _client.PutAsJsonAsync($"/api/category/{invalidArticleId}", request);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task DeleteCategory_ValidId_ReturnsNoContent()
    {
        // Act
        var response = await _client.DeleteAsync($"/api/category/{_categoryId}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); //NoContent
    }

    [Fact]
    public async Task DeleteCategory_InvalidId_ReturnsNotFound()
    {
        // Arrange
        int invalidArticleId = 9999;  // Use an ID that does not exist

        // Act
        var response = await _client.DeleteAsync($"/api/category/{invalidArticleId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task SearchCategory_ValidQuery_ReturnsArticles()
    {
        // Act
        var response = await _client.GetAsync($"/api/category/search?Search=Sample");
        var articlePage = await response.Content.ReadFromJsonAsync<PageResponse<CategoryResponse>>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(articlePage);
        Assert.NotEmpty(articlePage.Items);

    }

    [Fact]
    public async Task SearchCategory_InvalidQuery_ReturnsEmptyList()
    {
        // Act
        var response = await _client.GetAsync($"/api/category/search?Search=InvalidQuery");
        var articlePage = await response.Content.ReadFromJsonAsync<PageResponse<CategoryResponse>>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(articlePage);
        Assert.Empty(articlePage.Items);
    }

    
}
