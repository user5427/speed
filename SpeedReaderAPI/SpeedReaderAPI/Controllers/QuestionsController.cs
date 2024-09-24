using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.Models;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.Entities;
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
    public async Task<ActionResult<int>> CreateQuestion([FromBody] QuestionRequest request)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var question = await _questionService.CreateQuestionAsync(request);
            response.Status = true;
            response.Message = "Success";
            response.Data = question;
            return Ok(response); ;
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
    public async Task<IActionResult> UpdateQuestion([FromBody] QuestionRequest request)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var question = await _questionService.UpdateQuestionAsync(request);
            response.Status = true;
            response.Message = "Success";
            response.Data = question;
            return Ok(response); ;
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
    public async Task<IActionResult> DeleteQuestion(int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            await _questionService.DeleteQuestionAsync(id);
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
