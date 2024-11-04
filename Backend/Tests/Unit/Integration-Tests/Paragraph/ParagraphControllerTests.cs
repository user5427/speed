using System.Net;
using System.Net.Http.Json;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Paragraph.Responses;

namespace Unit;

public class ParagraphControllerTests : IClassFixture<PlaygroundApplication>
{
    private readonly HttpClient _client;
    private int _paragraphCount = 0;

    public ParagraphControllerTests(PlaygroundApplication factory)
    {
        _client = factory.CreateClient();

        // Seed database with an article before tests
        using var scope = factory.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
        factory.SeedDatabaseWithArticle(dbContext).Wait();
    }

    public async Task<int> CreateParagraph (string title = "Test Paragraph", string text = "Test Content", int articleId = 1) {
        // Act
        var request = new ParagraphCreateRequest(
            Title: title + _paragraphCount++,
            Text: text,
            ArticleId: articleId
        );

        var response = await _client.PostAsJsonAsync("/api/paragraphs", request);
        var createdParagraph = await response.Content.ReadFromJsonAsync<ParagraphResponse>();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); // Created
        Assert.NotNull(createdParagraph);
        return createdParagraph.Id;
    }

    [Fact]
    public async Task CreateParagraph_ValidData_ReturnsCreatedParagraph()
    {
        // Arrange
        var request = new ParagraphCreateRequest(
            Title: "Test Paragraph",
            Text: "Test Content",
            ArticleId: 1
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/paragraphs", request);
        var createdParagraph = await response.Content.ReadFromJsonAsync<ParagraphResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); // Created
        Assert.NotNull(createdParagraph);
        Assert.Equal(request.Title, createdParagraph?.Title);
        Assert.Equal(request.Text, createdParagraph?.Text);
        Assert.Equal(request.ArticleId, createdParagraph?.ArticleId);
    }

    [Fact]
    public async Task CreateParagraph_InvalidData_ReturnsBadRequest()
    {
        // Arrange: Title does not meet the required length constraints
        var request = new ParagraphCreateRequest(
            Title: "Sh",  // Assume this is less than ValidationConstants.MinTitleLength
            Text: "Test Content",
            ArticleId: 1
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/paragraphs", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetParagraph_ValidId_ReturnsParagraph()
    {
        // Arrange
        var paragraphId = await CreateParagraph();
        var response = await _client.GetAsync($"/api/paragraphs/{paragraphId}");
        var paragraph = await response.Content.ReadFromJsonAsync<ParagraphResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(paragraph);
        Assert.Equal(paragraphId, paragraph?.Id);
    }

    [Fact]
    public async Task GetParagraph_InvalidId_ReturnsNotFound()
    {
        // Arrange: Paragraph ID does not exist
        var response = await _client.GetAsync($"/api/paragraphs/0");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task UpdateParagraph_ValidData_ReturnsUpdatedParagraph()
    {
        // Arrange
        var paragraphId = await CreateParagraph();
        var request = new ParagraphUpdateRequest(
            Title: "Updated Title",
            Text: "Updated Content",
            ArticleId: 1,
            QuestionIds: null
        );

        // Act
        var response = await _client.PutAsJsonAsync($"/api/paragraphs/{paragraphId}", request);
        var updatedParagraph = await response.Content.ReadFromJsonAsync<ParagraphResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(updatedParagraph);
        Assert.Equal(request.Title, updatedParagraph?.Title);
        Assert.Equal(request.Text, updatedParagraph?.Text);
    }

    [Fact]
    public async Task UpdateParagraph_InvalidData_ReturnsBadRequest()
    {
        // Arrange: Title does not meet the required length constraints
        var paragraphId = await CreateParagraph();
        var request = new ParagraphUpdateRequest(
            Title: "Sh",  // Assume this is less than ValidationConstants.MinTitleLength
            Text: "Updated Content",
            ArticleId: 1,
            QuestionIds: null
        );

        // Act
        var response = await _client.PutAsJsonAsync($"/api/paragraphs/{paragraphId}", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task DeleteParagraph_ValidId_ReturnsNoContent()
    {
        // Arrange
        var paragraphId = await CreateParagraph();

        // Act
        var response = await _client.DeleteAsync($"/api/paragraphs/{paragraphId}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); // NoContent
    }

    [Fact]
    public async Task DeleteParagraph_InvalidId_ReturnsNotFound()
    {
        // Arrange: Paragraph ID does not exist
        var response = await _client.DeleteAsync($"/api/paragraphs/0");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task SearchParagraphs_ValidQuery_ReturnsParagraphs()
    {
        // Arrange
        await CreateParagraph();

        // Act
        var response = await _client.GetAsync($"/api/paragraphs/search?Search=Test");
        var paragraphPage = await response.Content.ReadFromJsonAsync<ParagraphPageResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(paragraphPage);
        Assert.NotNull(paragraphPage.Paragraphs);
        Assert.NotEmpty(paragraphPage.Paragraphs);
        // Assert.Contains(paragraphPage.Paragraphs, p => p.Id == paragraphId);
    }

}
