using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Services;
using SpeedReaderAPI.Services.Impl;
using SpeedReaderAPI.Filters;
using SpeedReaderAPI;
using Serilog;
using Serilog.Events;
using Elastic.CommonSchema.Serilog;
using Serilog.Sinks.Async;
using Elastic.Serilog.Sinks;
using Elastic.Ingest.Elasticsearch.DataStreams;
using Elastic.Ingest.Elasticsearch;
using Elastic.Channels;
using Elastic.Transport;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft.AspNetCore.Hosting", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Mvc", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Routing", LogEventLevel.Warning)
    .WriteTo.Console(new EcsTextFormatter())
    .CreateBootstrapLogger();


try
{
    // Build configuration to access appsettings.json
    var configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .Build();

    var builder = WebApplication.CreateBuilder(args);
    builder.Services.AddHttpContextAccessor();
    builder.Host.UseSerilog((context, services, loggerConfig) =>
    {
        bool useElasticsearch = configuration.GetValue<bool>("UseElasticsearch");
        var elasticsearchUrl = context.Configuration["Elasticsearch:Url"];
        var elasticUsername = context.Configuration["Elasticsearch:Username"];
        var elasticPassword = context.Configuration["Elasticsearch:Password"];

        loggerConfig
            .ReadFrom.Configuration(context.Configuration)
            .ReadFrom.Services(services)
            .MinimumLevel.Debug()
            .Enrich.FromLogContext()
            .WriteTo.File("logs/log.txt", rollingInterval: RollingInterval.Day)
            .WriteTo.Async(a => a.Console(new EcsTextFormatter()));

        if (useElasticsearch)
        {
            // Setup Elasticsearch sink with basic options and error handling
            try
            {
                var httpAccessor = services.GetRequiredService<IHttpContextAccessor>(); // Add HttpContextAccessor
                loggerConfig.Enrich.WithEcsHttpContext(httpAccessor);
                loggerConfig.WriteTo.Elasticsearch(
                    new[] { new Uri(elasticsearchUrl) },
                    opts =>
                    {
                        opts.BootstrapMethod = BootstrapMethod.Failure; // Continue on failure
                    },
                    transport =>
                    {
                        // Configure basic authentication
                        transport.Authentication(new BasicAuthentication(elasticUsername, elasticPassword));
                    }
                );
            }
            catch (Exception ex)
            {
                Log.Warning(ex, "Elasticsearch sink failed to initialize. Logging to console and file only.");
            }
        }
    });

    // Service and Middleware setup
    builder.Services.AddControllers(options =>
        {
            options.Filters.Add<RequestValidationFilter>();
            options.Filters.Add<ExceptionFilter>();
        });
    builder.Services.AddScoped<IImageService, ImageService>();
    builder.Services.AddScoped<IArticleService, ArticleService>();
    builder.Services.AddScoped<IParagraphService, ParagraphService>();
    builder.Services.AddScoped<IQuestionService, QuestionService>();
    builder.Services.AddScoped<IValidationSettingsService, ValidationSettingsService>();
    builder.Services.AddScoped<ICategoryService, CategoryService>();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
    builder.Services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

    var app = builder.Build();

    app.UseSerilogRequestLogging();

    app.Use(async (context, next) =>
    {
        try
        {
            await next();
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Unhandled exception occurred while processing request.");
            throw;
        }
    });

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthorization();
    app.UseCors("AllowAll");
    app.MapControllers();

    app.Run();

}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}

public partial class Program { }