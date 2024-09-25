using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.Article.Requests;
using SpeedReaderAPI.DTOs.Models;
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

    [HttpPost]
    public IActionResult CreateArticle(CreateArticleRequest createArticle)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var article = _articleService.CreateArticle(createArticle);
            response.Data = article;
            response.Message = "Success";
            
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ArticleController while creating! " + ex.GetBaseException());
            return BadRequest(response);
        }
    }

    [HttpGet]
    public IActionResult GetAllArticles(int pageIndex = 0, int pageSize = 10)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var articles = _articleService.GetAllArticles(pageIndex, pageSize);
            response.Message = "Success";
            response.Data = articles;
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ArticleController while getting all! " + ex.GetBaseException());
            return BadRequest(response);
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetArticleById(int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var article = _articleService.GetArticleById(id);
            response.Message = "Success";
            response.Data = article;
            if (response.Data == null)
            {
                response.Message = "Doesn't exist";
                return BadRequest(response);
            }
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ArticleController while getting by id! " + ex.GetBaseException());
            return BadRequest(response);
        }
    }

    [HttpPut("{id}")]
    public IActionResult UpdateArticle(CreateArticleRequest request, int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        request.Id = id;
        try
        {
            var article = _articleService.UpdateArticle(request);
            response.Message = "Success";
            response.Data = article;
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ArticleController while putting! " + ex.GetBaseException());
            return BadRequest(response);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteArticle(int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            _articleService.DeleteArticle(id);
            response.Message = "Deleted successfully";
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ArticleController while deleting by id! " + ex.GetBaseException());
            return BadRequest(response);
        }
    }
}
