using System.Net;
using System.Net.Http.Json;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Paragraph.Responses;

namespace Unit;

public class ParagraphControllerTests : IClassFixture<PlaygroundApplication>, IAsyncLifetime
{
    private readonly PlaygroundApplication _dbContextFactory;
    private HttpClient _client;
    private int? _articleId;
    private int? _paragraphId;

    public ParagraphControllerTests(PlaygroundApplication factory)
    {
        _dbContextFactory = factory;
        _client = factory.CreateClient();
    }

    ValueTask IAsyncLifetime.InitializeAsync()
    {
        var scope = _dbContextFactory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();

        // Ensure database is prepared synchronously
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        // Call SeedInitialData and ensure it completes before proceeding
        HelperMethods.SeedInitialData(context).Wait();

        // Now retrieve the IDs only after seeding is confirmed complete
        var initializationTask = HelperMethods.GetFirstArticleId(context)
            .ContinueWith(articleTask =>
            {
                // Handle case where no articles exist after seeding
                if (articleTask.Result == null)
                {
                    throw new InvalidOperationException("No articles found after seeding.");
                }

                _articleId = articleTask.Result;

                return HelperMethods.GetFirstParagraphId(context).ContinueWith(paragraphTask =>
                {
                    // Handle case where no paragraphs exist after seeding
                    if (paragraphTask.Result == null)
                    {
                        throw new InvalidOperationException("No paragraphs found after seeding.");
                    }

                    _paragraphId = paragraphTask.Result;
                    scope.Dispose();
                });
            }).Unwrap();

        return new ValueTask(initializationTask);
    }

    public ValueTask DisposeAsync()
    {
        return ValueTask.CompletedTask;
    }

    [Fact]
    public async Task CreateParagraph_ValidData_ReturnsCreatedParagraph()
    {
        var request = new ParagraphCreateRequest(
            Title: "Test Paragraph",
            Text: "Test Content",
            ArticleId: _articleId.Value
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
            ArticleId: _articleId.Value
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
        Assert.Equal(_articleId.Value, paragraph?.Id);
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
            ArticleId: _articleId.Value,
            QuestionIds: null
        );

        // Act
        var response = await _client.PutAsJsonAsync($"/api/paragraphs/{_paragraphId.Value}", request);
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
        var response = await _client.PutAsJsonAsync($"/api/paragraphs/{_paragraphId.Value}", request);
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
        var paragraphPage = await response.Content.ReadFromJsonAsync<ParagraphPageResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(paragraphPage);
        Assert.NotNull(paragraphPage.Paragraphs);
        Assert.NotEmpty(paragraphPage.Paragraphs);
        // Assert.Contains(paragraphPage.Paragraphs, p => p.Id == paragraphId);
    }


}
