using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.Requests;
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
        try
        {
            var paragraph = await _paragraphService.CreateParagraphAsync(articleId, request);
            return Ok(paragraph.Id);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    // GET

    // PUT

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateParagraph(int id, [FromBody] ParagraphRequest request)
    {
        try
        {
            var updatedParagraph = await _paragraphService.UpdateParagraphAsync(id, request);
            return Ok(updatedParagraph.Id);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);

        }
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteParagraph(int id)
    {
        try
        {
            await _paragraphService.DeleteParagraphAsync(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }
}