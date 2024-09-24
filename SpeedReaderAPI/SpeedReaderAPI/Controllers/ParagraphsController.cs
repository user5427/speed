using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.Models;
using SpeedReaderAPI.DTOs.Requests;
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
    public async Task<ActionResult<int>> CreateParagraph(int articleId, [FromBody] ParagraphRequest request)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var paragraph = await _paragraphService.CreateParagraphAsync(request);
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
    public async Task<IActionResult> UpdateParagraph(int id, [FromBody] ParagraphRequest request)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var updatedParagraph = await _paragraphService.UpdateParagraphAsync(request);
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
    public async Task<IActionResult> DeleteParagraph(int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            await _paragraphService.DeleteParagraphAsync(id);
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
