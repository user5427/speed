using System.Net;
using System.Net.Http.Json;

using SpeedReaderAPI.DTOs.Auth.Requests;
using SpeedReaderAPI.DTOs.Auth.Responses;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Moq;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.DTOs.ArticleSession.Requests;
using SpeedReaderAPI.Entities;

namespace Unit;

public class ArticleSessionsControllerTests : IClassFixture<PlaygroundApplicationFixture>
{
    private readonly PlaygroundApplicationFixture _fixture;
    private readonly HttpClient _client;
    private SpeedReaderAPI.Entities.User _user;

    public ArticleSessionsControllerTests(PlaygroundApplicationFixture fixture)
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
        DBHelperMethods.SeedInitialData(context);
        DBHelperMethods.SeedUserData(context);
        _user = DBHelperMethods.getUser(context);
    }

    [Fact]
    public async Task CreateArticle_ValidData_ReturnsCreatedArticle()
    {
        var registerr = new SpeedReaderAPI.DTOs.Auth.Requests.LoginRequest
        {
            Email = _user.Email,
            Password = "password"
        };
         var responseA = await _client.PostAsJsonAsync("/api/auth/login", registerr);//LoginResponse
          var loginData = await responseA.Content.ReadFromJsonAsync<LoginResponse>();
          _client.DefaultRequestHeaders.Add("Authorization", loginData.Token);
          _client.DefaultRequestHeaders.Add("Role", "USER");

        var request1 = new ArticleCreateRequest(
            Title: "Test Article",
            CategoryTitle: "Test Category"
        );

        // Act
        var response1 = await _client.PostAsJsonAsync("/api/articles", request1);
        var createdArticle = await response1.Content.ReadFromJsonAsync<ArticleResponse>();

        // Arrange
        var request = new ArticleSessionCreateRequest(
            
            ArticleId: createdArticle.Id,
            ParagraphSessions: null
        );

        // Act
        var response = await _client.PostAsJsonAsync("/api/article-sessions", request);
       

        // Temporary assertion
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    
    
}
