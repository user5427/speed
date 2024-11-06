using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;

public class ContextCreator {
    public static ApplicationContext CreateContext(string dbName = Constants.TestDatabaseName)
    {
        // Create options for the in-memory database
        var options = new DbContextOptionsBuilder<ApplicationContext>()
            .UseInMemoryDatabase(databaseName: dbName) // Name of the in-memory database
            .Options;

        // Create the context using the options
        var context = new ApplicationContext(options);
        context.Database.EnsureCreated(); // Ensure the database is created
        return context;
    }
}