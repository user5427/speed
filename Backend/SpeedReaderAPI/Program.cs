using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.Services;
using SpeedReaderAPI.Services.Impl;
using SpeedReaderAPI.Filters;
using SpeedReaderAPI;
using Serilog;
using Serilog.Events;
using Elastic.CommonSchema.Serilog;
using Elastic.Serilog.Sinks;
using Elastic.Ingest.Elasticsearch;
using Elastic.Transport;
using Prometheus;
using Microsoft.OpenApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft.AspNetCore.Hosting", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Mvc", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Routing", LogEventLevel.Warning)
    .CreateLogger();

try
{
    // Build configuration to access appsettings.json
    var builder = WebApplication.CreateBuilder(args);


    // Add secrets from /run/secrets
    // builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    //                  .AddKeyPerFile("/run/secrets", optional: true);
    
    // Build configuration after loading all sources
    var configuration = builder.Configuration;

    // bool useDefaultFiles = configuration.GetValue<bool>("UseDefaultFiles");

    // if (!useDefaultFiles)
    // {
    //     // Dynamically update placeholders in the configuration
    //     var dbConnectionString = configuration["db_connection_string"]; // From /run/secrets
    //     var jwtKey = configuration["jwt_key"]; // From /run/secrets

    //     // Ensure the secrets are loaded and replace placeholders
    //     if (!string.IsNullOrEmpty(dbConnectionString))
    //     {
    //         builder.Configuration["ConnectionStrings:Default"] = dbConnectionString;
    //     }
    //     else
    //     {
    //         Log.Fatal("DB_CONNECTION_STRING secret not found!");
    //         // throw new Exception("DB_CONNECTION_STRING secret not found!");
    //     }

    //     if (!string.IsNullOrEmpty(jwtKey))
    //     {
    //         builder.Configuration["Jwt:Key"] = jwtKey;
    //     }
    //     else
    //     {
    //         Log.Fatal("JWT_KEY secret not found!");
    //         // throw new Exception("JWT_KEY secret not found!");
    //     }
    // }
    
    builder.Services.AddHttpContextAccessor();
    builder.Services.AddOpenTelemetry()
    .WithMetrics(metrics =>
    {
        metrics.AddPrometheusExporter().AddAspNetCoreInstrumentation();
        metrics.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("dotnet-app"));
    });
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
    builder.Services.AddScoped<IAuthService, AuthService>();
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<ITokenService, TokenService>();
    builder.Services.AddScoped<IArticleSessionService, ArticleSessionService>();
    builder.Services.AddScoped<IParagraphSessionService, ParagraphSessionService>();
    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new() { Title = "Pappa´s API", Version = "v1" });

        // Define the OAuth2.0 scheme that's in use (i.e., Implicit Flow)
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement()
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    },
                    Scheme = "oauth2",
                    Name = "Bearer",
                    In = ParameterLocation.Header,
                },
                new List<string>()
            }
        });
    });
    builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
    builder.Services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = builder.Configuration["Jwt:Issuer"],
                ValidAudience = builder.Configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
                ClockSkew = TimeSpan.Zero
            };
        });

    var app = builder.Build();

    // no touchy
    app.UseCors("AllowAll");

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


    bool usePrometheus = configuration.GetValue<bool>("UsePrometheus");


    app.UseRouting();
	app.UseAuthorization();


	if (usePrometheus)
    {
        app.MapPrometheusScrapingEndpoint();
		app.UseMetricServer();
		app.UseHttpMetrics();
    
        // app.UseEndpoints(endpoints =>
        // {
            // endpoints.MapControllers();
            // endpoints.MapMetrics();
        // });
	}
    

    // Configure the HTTP request pipeline.
    // if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
    // {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
            options.RoutePrefix = string.Empty; // Default swagger route
        });

    // }

    // app.UseHttpsRedirection();

    app.MapControllers();
    // Log.Fatal("Connection String: {ConnectionString}" + builder.Configuration["ConnectionStrings:Default"]);
    // Log.Fatal("JWT Key: {JwtKey}" + builder.Configuration["Jwt:Key"]);
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