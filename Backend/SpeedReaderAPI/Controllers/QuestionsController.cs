using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question.Responses;
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

    [HttpPost("{id}/img")]
    public async Task<IActionResult> UploadImage(int id, [FromForm] ImageUploadRequest request)
    {
        QuestionResponse result = await _questionService.UploadImage(id, request);
        return Ok(result);
    }

    [HttpDelete("{id}/img")]
    public IActionResult DeleteImage(int id)
    {
        _questionService.DeleteImage(id);
        return Ok("Deleted");
    }

    [HttpGet("{id}/img")]
    public IActionResult GetImage(int id)
    {
        var img = _questionService.GetImage(id);
        return File(img.FileStream!, img.ImageMimeType.ToMimeString(), img.ImageFilePath);
    }


    [HttpGet("{id}")]
    public IActionResult GetQuestion(int id)
    {
        QuestionResponse questionResponse = _questionService.GetQuestion(id);
        return Ok(questionResponse);
    }

    [HttpGet("search/")]
    public IActionResult SearchQuestions([FromQuery] QueryParameters queryParameters)
    {
        PageResponse<QuestionResponse> questionPageResponse = _questionService.SearchQuestions(queryParameters);
        return Ok(questionPageResponse);
    }

    [HttpPost]
    public ActionResult<int> CreateQuestion(QuestionCreateRequest request)
    {
        QuestionResponse questionResponse = _questionService.CreateQuestion(request);
        return Ok(questionResponse);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateQuestion(int id, QuestionUpdateRequest request)
    {
        QuestionResponse questionResponse = _questionService.UpdateQuestion(id, request);
        return Ok(questionResponse);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteQuestion(int id)
    {
        _questionService.DeleteQuestion(id);
        return Ok("Deleted");
    }

    [HttpGet("count/")]
    public IActionResult GetQuestionCount()
    {
        int count = _questionService.GetCount();
        return Ok(count);
    }
}
