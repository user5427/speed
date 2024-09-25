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


    // POST

    [HttpPost("{articleId}")]
    public ActionResult<int> CreateParagraph(ParagraphRequest request)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var paragraph = _paragraphService.CreateParagraph(request);
            response.Status = true;
            response.Message = "Success";
            response.Data = paragraph;
            return Ok(response);
        }
        catch (Exception ex)
        {
            response.Status = false;
            response.Message = "Something went wrong";
            return BadRequest(response);
        }
    }

    // GET

    // PUT

    [HttpPut("{id}")]
    public IActionResult UpdateParagraph(ParagraphRequest request)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var updatedParagraph = _paragraphService.UpdateParagraph(request);
            response.Status = true;
            response.Message = "Success";
            response.Data = updatedParagraph;
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
    public IActionResult DeleteParagraph(int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            _paragraphService.DeleteParagraph(id);
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
