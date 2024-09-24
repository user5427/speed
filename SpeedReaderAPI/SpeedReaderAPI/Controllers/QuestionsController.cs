using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.Services;
namespace SpeedReaderAPI.Controllers;


[ApiController]
[Route("api/[controller]")]
public class QuestionsController : ControllerBase
{
    private readonly IQuestionService _questionService;
    private readonly ILogger<QuestionsController> _logger;

    public QuestionsController(ILogger<QuestionsController> logger, IQuestionService questionService)
    {
        _logger = logger;
        _questionService = questionService;
    }

    // POST
    [HttpPost("{paragraphId}")]
    public async Task<ActionResult<int>> CreateQuestion(int paragraphId, [FromBody] QuestionRequest request)
    {
        try
        {
            var question = await _questionService.CreateQuestionAsync(paragraphId, request);
            return Ok(question.Id);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    // GET

    // PUT
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuestion(int id, [FromBody] QuestionRequest request)
    {
        try
        {
            var updatedQuestion = await _questionService.UpdateQuestionAsync(id, request);
            return Ok(updatedQuestion.Id);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuestion(int id)
    {
        try
        {
            await _questionService.DeleteQuestionAsync(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }
}