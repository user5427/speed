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
    [HttpGet("{id}")]
    public IActionResult GetQuestion(int id)
    {
        BaseResponseModel response = new BaseResponseModel();
        response.Message = "Found successfully";
        response.Data = _questionService.GetQuestion(id);
        if(response.Data == null) {
            response.Message = "Not found!";
            return BadRequest(response);
        }
        return Ok(response);
    }
    [HttpPost("{paragraphId}")]
    public ActionResult<int> CreateQuestion(QuestionRequest request, int paragraphId)
    {
     
        BaseResponseModel response = new BaseResponseModel();
        request.ParagraphId = paragraphId;
        try
        {
           
            var question = _questionService.CreateQuestion(request);
            response.Message = "Success";
            response.Data = question;
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in QuestionsController while creating with id! " + ex.GetBaseException());
            return BadRequest(response);
        }
    }

    [HttpPut("{id}")]
    public IActionResult UpdateQuestion(QuestionRequest request, int id)
    {
        request.Id = id;
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            var question = _questionService.UpdateQuestion(request);
            response.Message = "Success";
            response.Data = question;
            return Ok(response); ;
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in QuestionsController while updating with id! " + ex.GetBaseException());
            return BadRequest(response);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteQuestion(int id)
    {
		BaseResponseModel response = new BaseResponseModel();
        try
        {
            _questionService.DeleteQuestion(id);
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
