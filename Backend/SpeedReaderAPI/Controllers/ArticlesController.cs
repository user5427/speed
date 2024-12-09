namespace SpeedReaderAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services;
using Serilog;

[ApiController]
[Route("api/[controller]")]
public class ArticlesController : ControllerBase
{
    private readonly IArticleService _articleService;
    private readonly ILogger<ArticlesController> _logger;
    private readonly IDiagnosticContext _diagnosticContext;
    public ArticlesController(ILogger<ArticlesController> logger,
     IArticleService articleService, IDiagnosticContext diagnosticContext)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _diagnosticContext = diagnosticContext ?? throw new ArgumentNullException(nameof(diagnosticContext));
        _articleService = articleService;

        _diagnosticContext.Set("Controller", nameof(ArticlesController));
    }

    [HttpPost("{id}/img")]
    public async Task<IActionResult> UploadImage(int id, [FromForm] ImageUploadRequest request)
    {
        ArticleResponse result = await _articleService.UploadImage(id, request);
        return Ok(result);
    }

    [HttpDelete("{id}/img")]
    public IActionResult DeleteImage(int id)
    {
        _articleService.DeleteImage(id);
        return Ok("Deleted");
    }

    [HttpGet("{id}/img")]
    public IActionResult GetImage(int id)
    {
        Image img = _articleService.GetImage(id);
        return File(img.FileStream!, img.ImageMimeType.ToMimeString(), img.ImageFilePath);
    }

    [HttpPost]
    public IActionResult CreateArticle(ArticleCreateRequest createArticle)
    {
        ArticleResponse articleResponse = _articleService.CreateArticle(createArticle);
        return Ok(articleResponse);
    }

    [HttpGet]
    public IActionResult GetAllArticles([FromQuery] QueryParameters queryParameters)
    {
        ArticlePageResponse articles = _articleService.GetArticles(queryParameters);
        return Ok(articles);
    }

    [HttpGet("{id}")]
    public IActionResult GetArticleById(int id)
    {
        ArticleResponse articleResponse = _articleService.GetArticleById(id);
        return Ok(articleResponse);
    }

    [HttpGet("search/")]
    public IActionResult SearchArticles([FromQuery] QueryParameters queryParameters)
    {
        PageResponse<ArticleResponse> articles = _articleService.SearchArticles(queryParameters);
        return Ok(articles);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateArticle(int id, [FromBody] ArticleUpdateRequest request)
    {
        ArticleResponse articleResponse = _articleService.UpdateArticle(id, request);
        return Ok(articleResponse);
    }


    [HttpDelete("{id}")]
    public IActionResult DeleteArticle(int id)
    {
        _articleService.DeleteArticle(id);
        return Ok("Deleted");
    }

    [HttpGet("count/")]
    public IActionResult GetArticleCount()
    {
        long count = _articleService.GetCount();
        return Ok(count);
    }
}