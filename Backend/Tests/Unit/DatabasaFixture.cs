using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;

public class DatabaseFixture : IDisposable
{
    public ApplicationContext Context { get; private set; }
    public DatabaseFixture()
    {
        // Create options for the in-memory database
        var DatabaseName = Guid.NewGuid().ToString();
        var options = new DbContextOptionsBuilder<ApplicationContext>()
            .UseInMemoryDatabase(databaseName: DatabaseName) // Name of the in-memory database
            .Options;

        // Create the context using the options
        Context = new ApplicationContext(options);
        Context.Database.EnsureCreated(); // Ensure the database is created
        HelperMethods.SeedInitialData(Context);
    }

    public void Dispose()
    {
        Context.Database.EnsureDeleted();
        Context.Dispose();
    }
}