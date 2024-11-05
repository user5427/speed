using Microsoft.Extensions.DependencyInjection;
using SpeedReaderAPI.Data;
using Unit;

public class InitialDataTesting : IClassFixture<PlaygroundApplication> 
{
    private readonly PlaygroundApplication _dbContextFactory;
    private HttpClient _client;
    private int? _articleId;
    private int? _paragraphId;

    public InitialDataTesting(PlaygroundApplication factory)
    {
        _dbContextFactory = factory;
        _client = factory.CreateClient();

        ensureDatabaseIsPrepared();
    }

    private void ensureDatabaseIsPrepared()
    {
        var scope = _dbContextFactory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();

        // Ensure database is prepared synchronously
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        // Call SeedInitialData and ensure it completes before proceeding
        HelperMethods.SeedInitialData(context);
        _articleId = HelperMethods.GetFirstArticleId(context);
        _paragraphId = HelperMethods.GetFirstParagraphId(context);
    }

    [Fact]
    public void InitialDataTest()
    {
        Assert.NotNull(_articleId);
        Assert.NotNull(_paragraphId);
    }

    [Fact]
    public void GetFirstArticleIdTest()
    {
        var scope = _dbContextFactory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
        var articleId = HelperMethods.GetFirstArticleId(context);
    }

    [Fact]
    public void GetFirstParagraphIdTest()
    {
        var scope = _dbContextFactory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
        var paragraphId = HelperMethods.GetFirstParagraphId(context);
    }

    // try to delete the DB and see if it is created again
    [Fact]
    public void DeleteDatabaseTest()
    {
        var scope = _dbContextFactory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();
        Assert.Throws<Exception>(() => HelperMethods.GetFirstArticleId(context));
    }

    // delete db, create and seed
    [Fact]
    public void SeedInitialDataTest()
    {
        var scope = _dbContextFactory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();
        HelperMethods.SeedInitialData(context);
        var articleId = HelperMethods.GetFirstArticleId(context);
    }
    
}