namespace SpeedReaderAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.Entities;
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

    [HttpPost("img/{id}")]
    public async Task<IActionResult> UploadImage(int id, [FromForm] IFormFile file)
    {
        try
        {
            ArticleResponse result = await _articleService.UploadImage(id, file);
            return Ok(result);
        } 
        catch(KeyNotFoundException ex) 
        {
            _logger.LogError("Something went wrong in ArticleController while uploading image {ExceptionMessage}.", ex.GetBaseException().Message);
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
        catch(ArgumentNullException) 
        {
            return BadRequest(
                    new ProblemDetails
                    {
                        Title = "No File uploaded",
                        Detail = "No articles match the specified criteria.",
                        Status = 400,
                        Instance = HttpContext.Request.Path
                    }
                );
        }
        catch(InvalidOperationException)
        {
            _logger.LogError($"Unsupported file format: {file.FileName}");
             return BadRequest(
                    new ProblemDetails
                    {
                        Title = "Unsupported file format",
                        Detail = $"Unsupported file extension {file.FileName}",
                        Status = 400,
                        Instance = HttpContext.Request.Path
                    }
                );
        }
        catch(Exception ex) 
        {
            _logger.LogError("Something went wrong in ArticleController UploadImage! {ExceptionMessage}.", ex.GetBaseException().Message);
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

    [HttpDelete("img/{id}")]
    public IActionResult DeleteImage(int id)
    {   
        try
        {
            _articleService.DeleteImage(id);
            return Ok();
        } 
        catch(KeyNotFoundException ex) 
        {
            _logger.LogError("Something went wrong in ArticleController while deleting image {ExceptionMessage}.", ex.GetBaseException().Message);
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
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ArticleController while deleting image! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred while deleting the article.",
                Status = 500,
                Instance = HttpContext.Request.Path
            });
        }
    }

    [HttpGet("img/{id}")]
    public IActionResult GetImage(int id)
    {
        try
        {
            var imageResult = _articleService.GetImage(id);

            // Check if the image result is null or does not have a file stream
            if (imageResult == null || !imageResult.HasValue || imageResult.Value.FileStream == null)
            {
                 return NotFound(
                    new ProblemDetails
                    {
                        Title = "No Image Found",
                        Detail = "Article does not have an image.",
                        Status = 404,
                        Instance = HttpContext.Request.Path
                    }
                );
            }

            var img = imageResult.Value;
            return File(img.FileStream, img.ImageMimeType.ToMimeString(), img.ImageFilePath);
        }
        catch(KeyNotFoundException ex)
        {
            _logger.LogError("Something went wrong in ArticleController while getting an image {ExceptionMessage}.", ex.GetBaseException().Message);
            return NotFound(
                    new ProblemDetails
                    {
                        Title = "No Article Found",
                        Detail = "No articles match the specified criteria.",
                        Status = 404,
                        Instance = HttpContext.Request.Path
                    }
                );
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ArticleController while getting an image! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred while deleting the article.",
                Status = 500,
                Instance = HttpContext.Request.Path
            });
        }
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
