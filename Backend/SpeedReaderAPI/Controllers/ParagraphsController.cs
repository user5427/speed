using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.Models;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services;
namespace SpeedReaderAPI.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ParagraphsController : ControllerBase
{
    private readonly IParagraphService _paragraphService;
    private readonly ILogger<ParagraphsController> _logger;

    public ParagraphsController(ILogger<ParagraphsController> logger, IParagraphService paragraphService)
    {
        _logger = logger;
        _paragraphService = paragraphService;
    }


    [HttpPost("{articleId}")]
    public ActionResult<int> CreateParagraph(ParagraphRequest request, int articleId)
    {
        request.ArticleId = articleId;
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var paragraph = _paragraphService.CreateParagraph(request);
            response.Message = "Success";
            response.Data = paragraph;
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ParagraphsController while post with id! " + ex.GetBaseException());
            return BadRequest(response);
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetParagraph(int id)
    {
        BaseResponseModel response = new BaseResponseModel();
        response.Message = "Found successfully";
        response.Data = _paragraphService.GetParagraph(id);
        if(response.Data == null)
        {
            response.Message = "Doesn't exist";
            return BadRequest(response);
        }
        return Ok(response);
    }
    /// <summary>
    /// YOU MUST PROVIDE THE TEXT OTHERWISE THE PROGRAM WILL CRASH. TO SOLVE IT WE NEED TO CHANGE THE WHOLE STRUCTURE
    /// </summary>
    /// <param name="request"></param>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpPut("{id}")]
    public IActionResult UpdateParagraph(ParagraphRequest request, int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        request.Id = id;
        try
        {
            var updatedParagraph = _paragraphService.UpdateParagraph(request);
            response.Message = "Success";
            response.Data = updatedParagraph;
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ParagraphsController while updating with id! " + ex.GetBaseException());
            return BadRequest(response);

        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteParagraph(int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            _paragraphService.DeleteParagraph(id);
            response.Message = "Deleted successfully";
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ParagraphsController while deleting with id! " + ex.GetBaseException());
            return BadRequest(response);
        }
    }
}
