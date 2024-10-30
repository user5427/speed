using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;

namespace Unit;

public class APIConnector : IClassFixture<CustomWebApplicationFactory<Program>>
{
    public HttpClient? UnitTest1(WebApplicationFactory<Program> factory)
    {
        var _factory = factory;
        var _client = factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });

        return _client;
    }
}