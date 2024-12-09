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


public class ValidationControllerTests : IClassFixture<PlaygroundApplicationFixture>
{
    private readonly PlaygroundApplicationFixture _fixture;
    private readonly HttpClient _client;
    private User _user;

    public ValidationControllerTests(PlaygroundApplicationFixture fixture)
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
    public async Task GetValidation()
    {
        
       var res = await _client.GetAsync($"/api/validationsettings");

        Assert.Equal(HttpStatusCode.OK, res.StatusCode);
        var dat = res.Content.ReadFromJsonAsync<ValidationSettingsResponce>();
        
    }

    [Fact]
    public async Task Update()
    {
        // Arrange
        var request = new ValidationSettingsUpdateRequest
        (
           10,10,10,10,10,10,10,10
        );

        var response = await _client.PutAsJsonAsync("/api/validationsettings", request);
        var loginResponse = await response.Content.ReadFromJsonAsync<ValidationSettingsResponce>();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }
}
