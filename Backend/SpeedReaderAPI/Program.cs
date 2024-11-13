using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Services;
using SpeedReaderAPI.Services.Impl;
using SpeedReaderAPI.Filters;
using SpeedReaderAPI;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.Elasticsearch;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft.AspNetCore.Hosting", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Mvc", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Routing", LogEventLevel.Warning)
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    // Build configuration to access appsettings.json
    var configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json")
        .Build();
    bool useElasticsearch = configuration.GetValue<bool>("UseElasticsearch");
    // Log.Information("Starting web application");

    var builder = WebApplication.CreateBuilder(args);
    builder.Host.UseSerilog((context, services, loggerConfig) =>
    {
        loggerConfig
            .ReadFrom.Configuration(context.Configuration)
            .ReadFrom.Services(services)
            .Enrich.FromLogContext()
            .WriteTo.File("logs/log.txt");

        // Conditionally add Elasticsearch sink
        if (useElasticsearch)
        {
            loggerConfig.WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri("http://localhost:9200"))
            {
                AutoRegisterTemplate = true,
                IndexFormat = "logstash-{0:yyyy.MM.dd}"
            });
        }
    });

    // Add services to the container.

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

    app.UseSerilogRequestLogging(options =>
    {
        // Customize the message template
        options.MessageTemplate = "Handled {RequestPath}";
        
        // Emit debug-level events instead of the defaults
        options.GetLevel = (httpContext, elapsed, ex) => LogEventLevel.Debug;
        
        // Attach additional properties to the request completion event
        options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
        {
            diagnosticContext.Set("RequestHost", httpContext.Request.Host.Value);
            diagnosticContext.Set("RequestScheme", httpContext.Request.Scheme);
        };
    });

    app.Use(async (context, next) =>
    {
        Log.Information("Handling request: {Method} {Path}", context.Request.Method, context.Request.Path);
        
        await next.Invoke();
        
        Log.Information("Finished handling request. Response Status: {StatusCode}", context.Response.StatusCode);
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