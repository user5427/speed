// public class 
using System.Net;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;

namespace Unit;


public class QuestionImageTests : IClassFixture<PlaygroundApplicationFixture>, IClassFixture<ImageFixture>
{
    private readonly ImageFixture _imageFixture;
    private readonly PlaygroundApplicationFixture _fixture;
    private HttpClient _client;
    private int _questionId;

    public QuestionImageTests(PlaygroundApplicationFixture fixture, ImageFixture imageFixture)
    {
        _imageFixture = imageFixture;
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
        _questionId = DBHelperMethods.GetFirstQuestionId(context);
    }

    // upload image
    [Fact]
    public async Task UploadImage_ValidId_ReturnsNoContent()
    {
        // Arrange
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "file", "placeholder.gif");

        // Act
        var response = await _client.PostAsync($"/api/questions/{_questionId}/img", form);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); //NoContent
    }

    [Fact]
    public async Task UploadImage_InvalidId_ReturnsNotFound()
    {
        // Arrange
        int invalidQuestionId = 9999;  // Use an ID that does not exist
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "file", "placeholder.gif");

        // Act
        var response = await _client.PostAsync($"/api/questions/{invalidQuestionId}/img", form);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
    [Fact]
    public async Task GetImage_Valid()
    {
        // Arrange
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "file", "placeholder.gif");

        // Act
        var response = await _client.PostAsync($"/api/questions/{_questionId}/img", form);

        // Assert
        
        var req = await _client.GetAsync($"/api/questions/{_questionId}/img");
        
        var dat = req.Content;
        Assert.NotNull(dat); 
        Assert.Equal(HttpStatusCode.OK, req.StatusCode);
        Assert.Equal("image/gif", req.Content.Headers.ContentType?.MediaType);

        // Verify that the content is not empty
        var imageData = await req.Content.ReadAsByteArrayAsync();
        Assert.NotNull(imageData);
        Assert.NotEmpty(imageData);
    }
    [Fact]
    public async Task GetImage_InvalidID()
    {
        // Arrange
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "file", "placeholder.gif");

        // Act
        var response = await _client.PostAsync($"/api/questions/{_questionId}/img", form);

        // Assert
        
        var req = await _client.GetAsync($"/api/questions/{99999}/img");
        var dat = req.Content;
        Assert.NotNull(dat); 
        Assert.Equal(HttpStatusCode.NotFound, req.StatusCode);
    }
    [Fact]
     public async Task DeleteImage_Valid()
    {
        // Arrange
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "file", "placeholder.gif");

        // Act
        var response = await _client.PostAsync($"/api/questions/{_questionId}/img", form);

        // Assert
        
         await _client.DeleteAsync($"/api/questions/{_questionId}/img");
        var req = await _client.GetAsync($"/api/questions/{_questionId}/img");
        Assert.Equal(HttpStatusCode.NotFound, req.StatusCode);
    }
    [Fact]
     public async Task DeleteCategoryWithImage_ValidId_ReturnsNoContent()
    {
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "file", "placeholder.gif");

        // Act
        await _client.PostAsync($"/api/questions/{_questionId}/img", form);
        // Act
        var response = await _client.DeleteAsync($"/api/questions/{_questionId}");
        var dat = await _client.GetAsync($"/api/questions/{_questionId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, dat.StatusCode); //NoContent
    }
    [Fact]
    public async Task GetImage_Invalid_NoImage()
    {  
        var req = await _client.GetAsync($"/api/questions/{_questionId}/img");
        var dat = req.Content;
        Assert.NotNull(dat); 
        Assert.Equal(HttpStatusCode.NotFound, req.StatusCode);
    }
}