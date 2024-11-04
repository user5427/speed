using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using SpeedReaderAPI.Data;

namespace Unit;

public class PlaygroundApplication : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                // Remove the existing DbContext registration, if any.
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<ApplicationContext>));

                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                // Add the in-memory database context for testing
                services.AddDbContext<ApplicationContext>(options =>
                {
                    options.UseInMemoryDatabase("TestDatabase");
                });

                // Ensure the database is created
                var sp = services.BuildServiceProvider();
                using var scope = sp.CreateScope();
                var db = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
                db.Database.EnsureCreated();
                db.Database.EnsureDeleted();

            });
        }
}