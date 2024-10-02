namespace SpeedReaderAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.Services;


[ApiController]
[Route("api/[controller]")]
public class ArticlesController : ControllerBase
{
    private readonly IArticleService _articleService;
    private readonly ILogger<ArticlesController> _logger;

    public ArticlesController(ILogger<ArticlesController> logger,
     IArticleService articleService)
    {
        _logger = logger;
        _articleService = articleService;
    }

    [HttpPost]
    public IActionResult CreateArticle(ArticleCreateRequest createArticle)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(
                    new ProblemDetails
                    {
                        Title = "Validation Error",
                        Detail = "One or more validation errors occurred.",
                        Status = 400,
                        Instance = HttpContext.Request.Path,
                        Extensions = { ["errors"] = ModelState }
                    });
            }

            ArticleResponse articleResponse = _articleService.CreateArticle(createArticle);
            return Ok(articleResponse);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ArticleController POST! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500,
                   new ProblemDetails
                   {
                       Title = "Internal Server Error",
                       Detail = "An unexpected error occurred while creating the article.",
                       Status = 500,
                       Instance = HttpContext.Request.Path
                   });
        }
    }

    [HttpGet]
    public IActionResult GetAllArticles([FromQuery] QueryParameters queryParameters)
    {
        try
        {
            ArticlePageResponse articles = _articleService.GetArticles(queryParameters);
            return Ok(articles);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ArticleController while getting all! {ExceptionMessage}.", ex.GetBaseException().Message);
            return NotFound(
                    new ProblemDetails
                    {
                        Title = "No Articles Found",
                        Detail = "No articles match the specified criteria.",
                        Status = 404,
                        Instance = HttpContext.Request.Path
                    }
                );
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetArticleById(int id)
    {
        try
        {
            ArticleResponse articleResponse = _articleService.GetArticleById(id);
            return Ok(articleResponse);
        }
        catch (KeyNotFoundException ex)
        {
            _logger.LogError(ex.GetBaseException().Message);
            return NotFound(new ProblemDetails
            {
                Title = "Article Not Found",
                Detail = $"No article found with ID {id}.",
                Status = 404,
                Instance = HttpContext.Request.Path
            });
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ArticleController while getting by id! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred while retrieving the article.",
                Status = 500,
                Instance = HttpContext.Request.Path
            });
        }
    }

    [HttpPut("{id}")]
    public IActionResult UpdateArticle(int id, [FromBody] ArticleUpdateRequest request)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Validation Error",
                    Detail = "One or more validation errors occurred.",
                    Status = 400,
                    Instance = HttpContext.Request.Path,
                    Extensions = { ["errors"] = ModelState }
                });
            }
            
            ArticleResponse articleResponse = _articleService.UpdateArticle(id, request);
            return Ok(articleResponse);
        }
        catch (KeyNotFoundException ex)
        {
            _logger.LogError(ex.GetBaseException().Message);
            return NotFound(new ProblemDetails
            {
                Title = "Article Not Found",
                Detail = $"No article found with ID {id}.",
                Status = 404,
                Instance = HttpContext.Request.Path
            });
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ArticleController while updating! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred while updating the article.",
                Status = 500,
                Instance = HttpContext.Request.Path
            });
        }
    }


    [HttpDelete("{id}")]
    public IActionResult DeleteArticle(int id)
    {
        try
        {
            _articleService.DeleteArticle(id);
            return Ok("Deleted");
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ArticleController while deleting by id! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred while deleting the article.",
                Status = 500,
                Instance = HttpContext.Request.Path
            });
        }
    }
}
