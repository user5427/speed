using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Auth.Requests;
using SpeedReaderAPI.DTOs.Auth.Responses;
using SpeedReaderAPI.Entities;


namespace Unit;

public class AuthControllerTests : IClassFixture<PlaygroundApplicationFixture>
{
    private readonly PlaygroundApplicationFixture _fixture;
    private readonly HttpClient _client;
    private User _user;

    public AuthControllerTests(PlaygroundApplicationFixture fixture)
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
        DBHelperMethods.SeedUserData(context);

        _user = DBHelperMethods.getUser(context);
    }

    [Fact]
    public async Task Register_ValidData_ReturnsToken()
    {
        // Arrange
        var request = new RegisterRequest 
        {
            Username = "testuser",
            Email = "testuser@example.com",
            Password = "TestPassword123"
        };

        var response = await _client.PostAsJsonAsync("/api/auth/register", request);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task Login_ValidData_ReturnsToken()
    {
        // Arrange
        var request = new LoginRequest
        {
            Email = _user.Email,
            Password = "password"
        };

        var response = await _client.PostAsJsonAsync("/api/auth/login", request);
        var loginResponse = await response.Content.ReadFromJsonAsync<LoginResponse>();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(loginResponse);
        Assert.NotNull(loginResponse.Token);
        Assert.Equal(_user.Username, loginResponse.Username);
    }

    [Fact]
    public async Task Login_InvalidData_ReturnsUnauthorized()
    {
        // Arrange
        var request = new LoginRequest
        {
            Email = "no@no.com",
            Password = "no",
        };

        var response = await _client.PostAsJsonAsync("/api/auth/login", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode); // Unauthorized
    }
}
