// public class 
using System.Net;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;
using Unit;

public class ParagraphImageTests : IClassFixture<PlaygroundApplicationFixture>, IClassFixture<ImageFixture>
{
    private readonly ImageFixture _imageFixture;
    private readonly PlaygroundApplicationFixture _fixture;
    private HttpClient _client;
    private int _paragraphId;

    public ParagraphImageTests(PlaygroundApplicationFixture fixture, ImageFixture imageFixture)
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
        _paragraphId = DBHelperMethods.GetFirstParagraphId(context);
    }

    // upload image
    [Fact]
    public async Task UploadImage_ValidId_ReturnsNoContent()
    {
        // Arrange
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "file", "placeholder.gif");

        // Act
        var response = await _client.PostAsync($"/api/paragraphs/{_paragraphId}/img", form);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode); //NoContent
    }

    [Fact]
    public async Task UploadImage_InvalidId_ReturnsNotFound()
    {
        // Arrange
        int invalidParagraphId = 9999;  // Use an ID that does not exist
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "file", "placeholder.gif");

        // Act
        var response = await _client.PostAsync($"/api/paragraphs/{invalidParagraphId}/img", form);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
    [Fact]
     public async Task DeleteImage_InValid_NoImage()
    {
        await _client.DeleteAsync($"/api/paragraphs/{_paragraphId}/img");
        var req = await _client.DeleteAsync($"/api/paragraphs/{_paragraphId}/img");
        Assert.Equal(HttpStatusCode.OK, req.StatusCode);
    }
    [Fact]
    public async Task GetImage_Valid()
    {
        // Arrange
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "file", "placeholder.gif");

        // Act
        var response = await _client.PostAsync($"/api/paragraphs/{_paragraphId}/img", form);

        // Assert
        
        var req = await _client.GetAsync($"/api/paragraphs/{_paragraphId}/img");
        
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
        var response = await _client.PostAsync($"/api/paragraphs/{_paragraphId}/img", form);

        // Assert
        
        var req = await _client.GetAsync($"/api/parahraphs/{99999}/img");
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
        var response = await _client.PostAsync($"/api/paragraphs/{_paragraphId}/img", form);

        // Assert
        
         await _client.DeleteAsync($"/api/paragraphs/{_paragraphId}/img");
        var req = await _client.GetAsync($"/api/paragraphs/{_paragraphId}/img");
        Assert.Equal(HttpStatusCode.NotFound, req.StatusCode);
    }
    [Fact]
     public async Task DeleteCategoryWithImage_ValidId_ReturnsNoContent()
    {
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "file", "placeholder.gif");

        // Act
        await _client.PostAsync($"/api/paragraphs/{_paragraphId}/img", form);
        // Act
        await _client.DeleteAsync($"/api/paragraphs/{_paragraphId}");
        var dat = await _client.GetAsync($"/api/paragraphs/{_paragraphId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, dat.StatusCode); //NoContent
    }
    [Fact]
    public async Task GetImage_Invalid_NoImage()
    {  
        var req = await _client.GetAsync($"/api/paragraphs/{_paragraphId}/img");
        var dat = req.Content;
        Assert.NotNull(dat); 
        Assert.Equal(HttpStatusCode.NotFound, req.StatusCode);
    }
}