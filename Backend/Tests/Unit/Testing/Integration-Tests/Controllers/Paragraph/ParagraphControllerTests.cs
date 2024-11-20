using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Paragraph.Responses;

namespace Unit;

public class ParagraphControllerTests : IClassFixture<PlaygroundApplicationFixture>
{
    private readonly PlaygroundApplicationFixture _fixture;
    private HttpClient _client;
    private int _articleId;
    private int _paragraphId;

    public ParagraphControllerTests(PlaygroundApplicationFixture fixture)
    {
        _fixture = fixture;
        _client = fixture.CreateClient();

        ensureDatabaseIsPrepared();
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
        _paragraphId = DBHelperMethods.GetFirstParagraphId(context);
    }

    [Fact]
    public async Task CreateParagraph_ValidData_ReturnsCreatedParagraph()
    {
        var request = new ParagraphCreateRequest(
            Title: "Test Paragraph",
            Text: "Test Content",
            ArticleId: _articleId
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
        var request = new ParagraphCreateRequest(
            Title: "Sh",  // Assume this is less than ValidationConstants.MinTitleLength
            Text: "Test Content",
            ArticleId: _articleId
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/paragraphs", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetParagraph_ValidId_ReturnsParagraph()
    {
        // Act
        var response = await _client.GetAsync($"/api/paragraphs/{_paragraphId}");
        var paragraph = await response.Content.ReadFromJsonAsync<ParagraphResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(paragraph);
        Assert.Equal(_articleId, paragraph?.Id);
    }

    [Fact]
    public async Task GetParagraph_InvalidId_ReturnsNotFound()
    {

        // Act
        var response = await _client.GetAsync($"/api/paragraphs/0");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task UpdateParagraph_ValidData_ReturnsUpdatedParagraph()
    {
        var request = new ParagraphUpdateRequest(
            Title: "Updated Title",
            Text: "Updated Content",
            ArticleId: _articleId,
            QuestionIds: null
        );

        // Act
        var response = await _client.PutAsJsonAsync($"/api/paragraphs/{_paragraphId}", request);
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
        var request = new ParagraphUpdateRequest(
            Title: "Sh",  // Assume this is less than ValidationConstants.MinTitleLength
            Text: "Updated Content",
            ArticleId: _articleId,
            QuestionIds: null
        );

        // Act
        var response = await _client.PutAsJsonAsync($"/api/paragraphs/{_paragraphId}", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task DeleteParagraph_ValidId_ReturnsNoContent()
    {
        // Act
        var response = await _client.DeleteAsync($"/api/paragraphs/{_paragraphId}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); // NoContent
    }

    [Fact]
    public async Task DeleteParagraph_InvalidId_ReturnsNotFound()
    {
        // Act
        var response = await _client.DeleteAsync($"/api/paragraphs/0");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task SearchParagraphs_ValidQuery_ReturnsParagraphs()
    {
        // Act
        var response = await _client.GetAsync($"/api/paragraphs/search?Search=Test");
        var paragraphPage = await response.Content.ReadFromJsonAsync<PageResponse<ParagraphResponse>>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(paragraphPage);
        Assert.NotEmpty(paragraphPage.Items);
        // Assert.Contains(paragraphPage.Paragraphs, p => p.Id == paragraphId);
    }

    [Fact]
    public async Task SearchParagraphs_InvalidQuery_ReturnsEmptyList()
    {
        // Act
        var response = await _client.GetAsync($"/api/paragraphs/search?Search=Invalid");
        var paragraphPage = await response.Content.ReadFromJsonAsync<PageResponse<ParagraphResponse>>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(paragraphPage);
        Assert.Empty(paragraphPage.Items);
    }

    [Fact]
    public async Task CreateParagraphNullArticle_InavlidData_ReturnsBadRequest()
    {
        var request = new ParagraphCreateRequest(
            Title: "Test Paragraph",
            Text: "Test Content",
            ArticleId: 0
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/paragraphs", request);
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

  [Fact]
    public async Task Count(){
        var resp = await _client.GetAsync($"/api/paragraphs/count");
        Assert.Equal(HttpStatusCode.OK, resp.StatusCode);
    }
}
