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


    // POST
    [HttpPost]
    public IActionResult CreateArticle(CreateArticleRequest createArticle)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var article = _articleService.CreateArticle(createArticle);
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
    public IActionResult GetAllArticles(int pageIndex = 0, int pageSize = 10)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var articles = _articleService.GetAllArticles(pageIndex, pageSize);
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
    public IActionResult GetArticleById(int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var article = _articleService.GetArticleById(id);
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
    [HttpPut]
    public IActionResult UpdateArticle(CreateArticleRequest request)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var article = _articleService.UpdateArticle(request);
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
    public IActionResult DeleteArticle(int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            _articleService.DeleteArticle(id);
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
