using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.Models;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.Entities;
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
    public async Task<IActionResult> CreateArticle([FromBody] ArticleRequest createArticle)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var article = await _articleService.CreateArticleAsync(createArticle);
            response.Status = true;
            response.Message = "Success";
            response.Data = article;
            return Ok(response);
        }
        catch (Exception ex)
        {
            // TODO: Log the exception, because we dont want to show the sure exception, showing server structure is a bad practise
            response.Status = false;
            response.Message = "Something went wrong";
            return BadRequest(response);
        }
    }

    // GET
    [HttpGet]
    public async Task<IActionResult> GetAllArticles(int pageIndex = 0, int pageSize = 10)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var articles = await _articleService.GetAllArticlesAsync(pageIndex, pageSize);
            response.Status = true;
            response.Message = "Success";
            response.Data = articles;
            return Ok(response);
        }
        catch (Exception ex)
        {
            response.Status = false;
            response.Message = "Something went wrong";
            return BadRequest(response);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetArticleById(int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var article = await _articleService.GetArticleByIdAsync(id);
            response.Status = true;
            response.Message = "Success";
            response.Data = article;
            return Ok(response);
        }
        catch (Exception ex)
        {
            response.Status = false;
            response.Message = "Something went wrong";
            return BadRequest(response);
        }
    }


    // PUT
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateArticle([FromBody] ArticleRequest request)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var article = await _articleService.UpdateArticleAsync(request);
            response.Status = true;
            response.Message = "Success";
            response.Data = article;
            return Ok(response);
        }
        catch (Exception ex)
        {
            response.Status = false;
            response.Message = "Something went wrong";
            return BadRequest(response);
        }
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteArticle(int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            await _articleService.DeleteArticleAsync(id);
            response.Status = true;
            response.Message = "Deleted successfully";
            return Ok(response);
        }
        catch (Exception ex)
        {
            response.Status = false;
            response.Message = "Something went wrong";
            return BadRequest(response);
        }
    }
}
