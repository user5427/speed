using System.Net;
using System.Net.Http.Headers;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services;

namespace Unit;

public class UserImageTests : IClassFixture<PlaygroundApplicationFixture>, IClassFixture<ImageFixture>
{
    private readonly ImageFixture _imageFixture;
    private readonly PlaygroundApplicationFixture _fixture;
    private HttpClient _client;
    private User _user;
    private readonly ITokenService _tokenService;

    public UserImageTests(PlaygroundApplicationFixture fixture, ImageFixture imageFixture)
    {
        _fixture = fixture;
        _imageFixture = imageFixture;
        _client = fixture.CreateClient();

        var configuration = _fixture.Services.GetRequiredService<Microsoft.Extensions.Configuration.IConfiguration>();
        _tokenService = new TokenService(configuration);
        EnsureDatabaseIsPrepared();
    }

    private void EnsureDatabaseIsPrepared()
    {
        var scope = _fixture.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();

        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        DBHelperMethods.SeedInitialData(context);
        _user = DBHelperMethods.getUser(context);
    }

    [Fact]
    public async Task UploadImage_Valid_ReturnsOk()
    {
        // Arrange
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "request.File", "placeholder.gif");

        var token = _tokenService.CreateToken(_user);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        // Act
        var response = await _client.PostAsync("/api/users/img", form);

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task UploadImage_Unauthorized_ReturnsUnauthorized()
    {
        // Arrange
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "request.File", "placeholder.gif");

        // Act
        var response = await _client.PostAsync("/api/users/img", form);

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task DeleteImage_Valid_ReturnsOk()
    {
        // Arrange
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "request.File", "placeholder.gif");

        var token = _tokenService.CreateToken(_user);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        await _client.PostAsync("/api/users/img", form);

        // Act
        var deleteResponse = await _client.DeleteAsync("/api/users/img");

        // Assert
        Assert.Equal(HttpStatusCode.OK, deleteResponse.StatusCode);
    }

    [Fact]
    public async Task DeleteImage_Unauthorized_ReturnsUnauthorized()
    {
        // Act
        var response = await _client.DeleteAsync("/api/users/img");

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task GetImage_ValidId_ReturnsImage()
    {
        // Arrange
        var form = new MultipartFormDataContent();
        form.Add(new StreamContent(_imageFixture.Image), "request.File", "placeholder.gif");

        var token = _tokenService.CreateToken(_user);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        await _client.PostAsync("/api/users/img", form);

        // Act
        var response = await _client.GetAsync($"/api/users/{_user.Id}/img");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("image/gif", response.Content.Headers.ContentType?.MediaType);

        var imageData = await response.Content.ReadAsByteArrayAsync();
        Assert.NotNull(imageData);
        Assert.NotEmpty(imageData);
    }

    [Fact]
    public async Task GetImage_InvalidId_ReturnsNotFound()
    {
        // Arrange
        int invalidId = 9999;

        // Act
        var response = await _client.GetAsync($"/api/users/{invalidId}/img");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
