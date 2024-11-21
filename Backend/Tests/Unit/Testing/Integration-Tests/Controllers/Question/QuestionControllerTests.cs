
using System.Net;
using System.Net.Http.Json;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question.Responses;

namespace Unit;

public class QuestionControllerTests : IClassFixture<PlaygroundApplicationFixture>
{
    private readonly PlaygroundApplicationFixture _fixture;

     private HttpClient _client;
    private int _articleId;
    private int _paragraphId;
    private int _questionId;

    public QuestionControllerTests(PlaygroundApplicationFixture fixture)
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
        _questionId = DBHelperMethods.GetFirstQuestionId(context);
    }

    [Fact]
    public async Task CreateQuestion_ValidData_ReturnsCreatedQuestion()
    {
        var request = new QuestionCreateRequest(
            QuestionText: "Test Content",
            ParagraphId: _paragraphId,
            AnswerChoices: new string[] { "help", "C# struggle", "haskell pain" },
            CorrectAnswerIndex: 1
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/questions", request);
        var createdQuestion = await response.Content.ReadFromJsonAsync<QuestionResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); // Created
        Assert.NotNull(createdQuestion);
        Assert.Equal(request.QuestionText, createdQuestion?.QuestionText);
        Assert.Equal(request.ParagraphId, createdQuestion?.ParagraphId);
        Assert.Equal(request.AnswerChoices, createdQuestion?.AnswerChoices);
        Assert.Equal(request.CorrectAnswerIndex, createdQuestion?.CorrectAnswerIndex);
    }

    [Fact]
    public async Task CreateQuestion_InvalidData_ReturnsBadRequest()
    {
        var request = new QuestionCreateRequest(
            QuestionText: "Test Content",
            ParagraphId: _paragraphId,
            AnswerChoices: new string[] { "help", "C# struggle", "haskell pain" },
            CorrectAnswerIndex: 4
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/questions", request);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode); // Bad Request
    }

    [Fact]
    public async Task GetQuestionById_ValidId_ReturnsQuestion()
    {
        // Act
        var response = await _client.GetAsync($"/api/questions/{_questionId}");
        var question = await response.Content.ReadFromJsonAsync<QuestionResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); // OK
        Assert.NotNull(question);
        Assert.Equal(_questionId, question?.Id);
    }

    [Fact]
    public async Task GetQuestionById_InvalidId_ReturnsNotFound()
    {
        // Act
        var response = await _client.GetAsync($"/api/questions/0");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode); // Not Found
    }

    [Fact]
    public async Task UpdateQuestion_ValidData_ReturnsUpdatedQuestion()
    {
        var request = new QuestionUpdateRequest(
            ParagraphId: null,
            QuestionText: "Updated Content",
            AnswerChoices: new string[] { "help", "C# struggle", "haskell pain" },
            CorrectAnswerIndex: 2
        );

        // Act
        var response = await _client.PutAsJsonAsync($"/api/questions/{_questionId}", request);
        var updatedQuestion = await response.Content.ReadFromJsonAsync<QuestionResponse>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); // OK
        Assert.NotNull(updatedQuestion);
        Assert.Equal(request.QuestionText, updatedQuestion?.QuestionText);
        Assert.Equal(request.AnswerChoices, updatedQuestion?.AnswerChoices);
        Assert.Equal(request.CorrectAnswerIndex, updatedQuestion?.CorrectAnswerIndex);
    }

    [Fact]
    public async Task UpdateQuestion_InvalidData_ReturnsBadRequest()
    {
        var request = new QuestionUpdateRequest(
            ParagraphId: null,
            QuestionText: "Updated Content",
            AnswerChoices: new string[] { "help", "C# struggle", "haskell pain" },
            CorrectAnswerIndex: 4
        );

        // Act
        var response = await _client.PutAsJsonAsync($"/api/questions/{_questionId}", request);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode); // Bad Request
    }

    [Fact]
    public async Task DeleteQuestion_ValidId_ReturnsNoContent()
    {
        // Act
        var response = await _client.DeleteAsync($"/api/questions/{_questionId}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); // replace to No Content
    }

    [Fact]
    public async Task DeleteQuestion_InvalidId_ReturnsNotFound()
    {
        // Act
        var response = await _client.DeleteAsync($"/api/questions/0");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode); // Not Found
    }

    [Fact]
    public async Task SearchQuestions_ValidQuery_ReturnsQuestions()
    {
        // Act
        var response = await _client.GetAsync("/api/questions/search?query=Test");
        var questions = await response.Content.ReadFromJsonAsync<PageResponse<QuestionResponse>>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); // OK
        Assert.NotNull(questions);
        Assert.NotEmpty(questions.Items);
    }

    [Fact]
    public async Task SearchQuestions_InvalidQuery_ReturnsEmptyList()
    {
        // Act
        var response = await _client.GetAsync("/api/questions/search?Search=InvalidQuery");
        var questions = await response.Content.ReadFromJsonAsync<PageResponse<QuestionResponse>>();

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); // OK
        Assert.NotNull(questions);
        Assert.Empty(questions.Items);
    }

    [Fact]
    public async Task CreateQuestionNullParagraph_InavlidData_ReturnsBadRequest()
    {
        var request = new QuestionCreateRequest(
            QuestionText: "Test Content",
            ParagraphId: 0,
            AnswerChoices: new string[] { "help", "C# struggle", "haskell pain" },
            CorrectAnswerIndex: 1
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/questions", request);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode); // Bad Request
    }

      [Fact]
    public async Task Count(){
        var resp = await _client.GetAsync($"/api/questions/count");
        Assert.Equal(HttpStatusCode.OK, resp.StatusCode);
    }
}
