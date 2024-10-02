using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question.Responses;
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
        try
        {
            QuestionResponse questionResponse = _questionService.GetQuestion(id);
            return Ok(questionResponse);
        }
        catch (KeyNotFoundException ex)
        {
            _logger.LogError(ex.GetBaseException().Message);
            return NotFound(new ProblemDetails
            {
                Title = "Question Not Found",
                Detail = $"No question found with ID {id}.",
                Status = 404,
                Instance = HttpContext.Request.Path
            });
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in QuestionsController GET BY ID! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500,
                   new ProblemDetails
                   {
                       Title = "Internal Server Error",
                       Detail = $"An unexpected error occurred while retrieving the question with ID {id}.",
                       Status = 500,
                       Instance = HttpContext.Request.Path
                   });
        }
    }
    [HttpPost]
    public ActionResult<int> CreateQuestion(QuestionCreateRequest request)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Validation Error",
                    Detail = "One or more validation errors occurred.",
                    Status = 400,
                    Instance = HttpContext.Request.Path,
                    Extensions = { ["errors"] = ModelState }
                });
            }

            QuestionResponse questionResponse = _questionService.CreateQuestion(request);
            return Ok(questionResponse);
        }
        catch (KeyNotFoundException ex)
        {
            // Note: Every Question is assigned to Paragraph
            _logger.LogError(ex.GetBaseException().Message);
            return NotFound(new ProblemDetails
            {
                Title = "Paragraph Not Found",
                Detail = $"No Paragraph found with ID {request.ParagraphId}.",
                Status = 404,
                Instance = HttpContext.Request.Path
            });
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in QuestionsController POST! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500,
                   new ProblemDetails
                   {
                       Title = "Internal Server Error",
                       Detail = "An unexpected error occurred while creating the question.",
                       Status = 500,
                       Instance = HttpContext.Request.Path
                   });
        }
    }

    [HttpPut("{id}")]
    public IActionResult UpdateQuestion(int id, QuestionUpdateRequest request)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ProblemDetails
                {
                    Title = "Validation Error",
                    Detail = "One or more validation errors occurred.",
                    Status = 400,
                    Instance = HttpContext.Request.Path,
                    Extensions = { ["errors"] = ModelState }
                });
            }

            QuestionResponse questionResponse = _questionService.UpdateQuestion(id, request);
            return Ok(questionResponse); ;
        }
        catch (KeyNotFoundException ex)
        {
            _logger.LogError(ex.GetBaseException().Message);
            return NotFound(new ProblemDetails
            {
                Title = "Question Not Found",
                Detail = $"No question found with ID {id}.",
                Status = 404,
                Instance = HttpContext.Request.Path
            });
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in QuestionsController while updating! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred while updating the question.",
                Status = 500,
                Instance = HttpContext.Request.Path
            });
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteQuestion(int id)
    {
        try
        {
            _questionService.DeleteQuestion(id);
            return Ok("Deleted");
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in QuestionsController while deleting by id! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = $"An unexpected error occurred while deleting the question with ID {id}.",
                Status = 500,
                Instance = HttpContext.Request.Path
            });
        }
    }
}
