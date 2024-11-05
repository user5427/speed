namespace Unit;

public class QuestionControllerTests
{
    [Fact]
    public void Test1()
    {
        Assert.True(true);
    }
}

// using Microsoft.Extensions.DependencyInjection;
// using SpeedReaderAPI.Data;

// namespace Unit;

// public class QuestionControllerTests : IClassFixture<PlaygroundApplication>, IAsyncLifetime
// {
//      private readonly PlaygroundApplication _dbContextFactory;
//     private HttpClient _client;
//     private int? _paragraphId;
//     private int? _questionId;

//     public QuestionControllerTests(PlaygroundApplication factory)
//     {
//         _dbContextFactory = factory;
//         _client = factory.CreateClient();
//     }

//     ValueTask IAsyncLifetime.InitializeAsync()
//     {
//         var scope = _dbContextFactory.Services.CreateScope();
//         var context = scope.ServiceProvider.GetRequiredService<ApplicationContext>();

//         // Ensure database is prepared synchronously
//         context.Database.EnsureDeleted();
//         context.Database.EnsureCreated();

//         // Call SeedInitialData and ensure it completes before proceeding
//         HelperMethods.SeedInitialData(context);
//         _paragraphId = HelperMethods.GetFirstParagraphId(context);
//         _questionId = HelperMethods.GetFirstQuestionId(context);
       
//         return ValueTask.CompletedTask;
//     }

//     public ValueTask DisposeAsync()
//     {
//         return ValueTask.CompletedTask;
//     }

// }
