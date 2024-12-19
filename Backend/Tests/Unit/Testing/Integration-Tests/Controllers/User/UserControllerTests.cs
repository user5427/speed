using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services; 
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Question.Responses;

namespace Unit;

public class UserControllerTests : IClassFixture<PlaygroundApplicationFixture>
{
    private readonly PlaygroundApplicationFixture _fixture;
    private readonly HttpClient _client;
    private readonly ITokenService _tokenService;
    private User _user;

    public UserControllerTests(PlaygroundApplicationFixture fixture)
    {
        _fixture = fixture;
        _client = fixture.CreateClient();

        // Initialize services
        var configuration = _fixture.Services.GetRequiredService<Microsoft.Extensions.Configuration.IConfiguration>();
        _tokenService = new TokenService(configuration);

        // Prepare database
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

    private void AuthenticateClient()
    {
        var token = _tokenService.CreateToken(_user);
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
    }

    [Fact]
    public async Task GetMyData_Authorized_ReturnsUserData()
    {
        // Arrange
        AuthenticateClient();

        // Act
        var response = await _client.GetAsync("/api/users/me");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var result = await response.Content.ReadFromJsonAsync<UserInfoResponse>(); 
        Assert.NotNull(result);
    }

    [Fact]
    public async Task GetMyData_Unauthorized_ReturnsUnauthorized()
    {
        // Act
        var response = await _client.GetAsync("/api/users/me");

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    // // Test: POST /api/users/img
    // [Fact]
    // public async Task UploadImage_Authorized_ReturnsSuccess()
    // {
    //     // Arrange
    //     AuthenticateClient();

    //     var imageRequest = new MultipartFormDataContent
    //     {
    //         { new ByteArrayContent(new byte[] { 1, 2, 3, 4 }), "File", "image.jpg" }
    //     };

    //     // Act
    //     var response = await _client.PostAsync("/api/users/img", imageRequest);

    //     // Assert
    //     Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    //     var result = await response.Content.ReadFromJsonAsync<ImageUploadResponse>();
    //     Assert.NotNull(result);
    // }

    // [Fact]
    // public async Task UploadImage_Unauthorized_ReturnsUnauthorized()
    // {
    //     // Arrange
    //     var imageRequest = new MultipartFormDataContent
    //     {
    //         { new ByteArrayContent(new byte[] { 1, 2, 3, 4 }), "File", "image.jpg" }
    //     };

    //     // Act
    //     var response = await _client.PostAsync("/api/users/img", imageRequest);

    //     // Assert
    //     Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    // }

    // // Test: DELETE /api/users/img
    // [Fact]
    // public async Task DeleteImage_Authorized_ReturnsSuccess()
    // {
    //     // Arrange
    //     AuthenticateClient();

    //     // Act
    //     var response = await _client.DeleteAsync("/api/users/img");

    //     // Assert
    //     Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    //     var result = await response.Content.ReadAsStringAsync();
    //     Assert.Equal("Deleted", result);
    // }

    // [Fact]
    // public async Task DeleteImage_Unauthorized_ReturnsUnauthorized()
    // {
    //     // Act
    //     var response = await _client.DeleteAsync("/api/users/img");

    //     // Assert
    //     Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    // }

    // // Test: GET /api/users/{id}/img
    // [Fact]
    // public async Task GetImage_ValidId_ReturnsImage()
    // {
    //     // Arrange
    //     int validImageId = 1; // Replace with a valid ID in your seeded data

    //     // Act
    //     var response = await _client.GetAsync($"/api/users/{validImageId}/img");

    //     // Assert
    //     Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    //     Assert.Equal("image/jpeg", response.Content.Headers.ContentType?.MediaType);
    // }

    // [Fact]
    // public async Task GetImage_InvalidId_ReturnsNotFound()
    // {
    //     // Arrange
    //     int invalidImageId = 9999;

    //     // Act
    //     var response = await _client.GetAsync($"/api/users/{invalidImageId}/img");

    //     // Assert
    //     Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    // }
}
