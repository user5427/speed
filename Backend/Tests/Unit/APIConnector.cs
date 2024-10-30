using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;

namespace Unit;

public class APIConnector : IClassFixture<CustomWebApplicationFactory<Program>>
{
    public HttpClient? GetClient(WebApplicationFactory<Program> factory)
    {
        var _client = factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });

        return _client;
    }
}