using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.Models;
using SpeedReaderAPI.DTOs.Question.Requests;
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
    public ActionResult<int> CreateQuestion(QuestionRequest request)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var question = _questionService.CreateQuestion(request);
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
    public IActionResult UpdateQuestion(QuestionRequest request)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var question = _questionService.UpdateQuestion(request);
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
    public IActionResult DeleteQuestion(int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            _questionService.DeleteQuestion(id);
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
