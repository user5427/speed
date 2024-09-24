using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.Services;
namespace SpeedReaderAPI.Controllers;


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


    // POST
    [HttpPost("{categoryId?}")]
    public async Task<IActionResult> CreateArticle(int? categoryId, [FromBody] ArticleRequest createArticle)
    {
        try
        {
            var article = await _articleService.CreateArticleAsync(categoryId, createArticle);
            return Ok(article.Id);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    // GET
    [HttpGet]
    public async Task<IActionResult> GetAllArticles()
    {
        try
        {
            var articles = await _articleService.GetAllArticlesAsync();
            return Ok(articles);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetArticleById(int id)
    {
        try
        {
            var article = await _articleService.GetArticleByIdAsync(id);
            return Ok(article);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }


    // PUT
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateArticle(int id, [FromBody] ArticleRequest request)
    {
        try
        {
            var updatedArticle = await _articleService.UpdateArticleAsync(id, request);
            return Ok(updatedArticle.Id);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteArticle(int id)
    {
        try
        {
            await _articleService.DeleteArticleAsync(id);
            return Ok();
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }
}
