using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question.Responses;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;
using SpeedReaderAPI.DTOs;
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
        if (!ModelState.IsValid)
        {
            return BadRequest(
                new ProblemDetails
                {
                    Title = "Validation Error",
                    Detail = "One or more validation errors occurred.",
                    Status = 410,
                    Instance = HttpContext.Request.Path,
                    Extensions = { ["errors"] = ModelState }
                });
        }
        try
        {
            QuestionResponse result = await _questionService.UploadImage(id, request);
            return Ok(result);
        } 
        catch(KeyNotFoundException ex) 
        {
            _logger.LogError("Something went wrong in QuestionsController while uploading image {ExceptionMessage}.", ex.GetBaseException().Message);
            return NotFound(
                    new ProblemDetails
                    {
                        Title = "No Questions Found",
                        Detail = "No questions match the specified criteria.",
                        Status = 404,
                        Instance = HttpContext.Request.Path
                    }
                );
        }
        catch(ResourceAlreadyExistsException ex)
        {
            _logger.LogError("Duplicate image: {ExceptionMessage}.", ex.GetBaseException().Message);
            return BadRequest(
                    new ProblemDetails
                    {
                        Title = "Duplicate image.",
                        Detail = "Image already exists.",
                        Status = 400,
                        Instance = HttpContext.Request.Path
                    }
                );
        }
        catch(ArgumentNullException) 
        {
            return BadRequest(
                    new ProblemDetails
                    {
                        Title = "No File uploaded",
                        Detail = "No question match the specified criteria.",
                        Status = 400,
                        Instance = HttpContext.Request.Path
                    }
                );
        }
        catch(InvalidOperationException)
        {
            _logger.LogError($"Unsupported file format: {request.File.FileName}");
             return BadRequest(
                    new ProblemDetails
                    {
                        Title = "Unsupported file format",
                        Detail = $"Unsupported file extension {request.File.FileName}",
                        Status = 400,
                        Instance = HttpContext.Request.Path
                    }
                );
        }
        catch(Exception ex) 
        {
            _logger.LogError("Something went wrong in QuestionsController UploadImage! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500,
                   new ProblemDetails
                   {
                       Title = "Internal Server Error",
                       Detail = "An unexpected error occurred while creating the quetion image.",
                       Status = 500,
                       Instance = HttpContext.Request.Path
                   });
        }
    }

    [HttpDelete("{id}/img")]
    public IActionResult DeleteImage(int id)
    {   
        try
        {
            _questionService.DeleteImage(id);
            return Ok("Deleted");
        } 
        catch(KeyNotFoundException ex) 
        {
            _logger.LogError("Something went wrong in QuestionsController while deleting image {ExceptionMessage}.", ex.GetBaseException().Message);
            return NotFound(
                    new ProblemDetails
                    {
                        Title = "No Questions Found",
                        Detail = "No Questions match the specified criteria.",
                        Status = 404,
                        Instance = HttpContext.Request.Path
                    }
                );
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in QuestionsController while deleting image! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred while deleting the question image.",
                Status = 500,
                Instance = HttpContext.Request.Path
            });
        }
    }

    [HttpGet("{id}/img")]
    public IActionResult GetImage(int id)
    {
        try
        {
            var imageResult = _questionService.GetImage(id);

            // Check if the image result is null or does not have a file stream
            if (imageResult == null || !imageResult.HasValue || imageResult.Value.FileStream == null)
            {
                 return NotFound(
                    new ProblemDetails
                    {
                        Title = "No Image Found",
                        Detail = "Question does not have an image.",
                        Status = 404,
                        Instance = HttpContext.Request.Path
                    }
                );
            }

            var img = imageResult.Value;
            return File(img.FileStream, img.ImageMimeType.ToMimeString(), img.ImageFilePath);
        }
        catch(KeyNotFoundException ex)
        {
            _logger.LogError("Something went wrong in QuestionsController while getting an image {ExceptionMessage}.", ex.GetBaseException().Message);
            return NotFound(
                    new ProblemDetails
                    {
                        Title = "No Question Found",
                        Detail = "No questions match the specified criteria.",
                        Status = 404,
                        Instance = HttpContext.Request.Path
                    }
                );
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in QuestionsController while getting an image! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred while deleting the question image.",
                Status = 500,
                Instance = HttpContext.Request.Path
            });
        }
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

    [HttpGet("search/{Search}")]
    public IActionResult SearchQuestions(string Search, [FromQuery] QueryParameters queryParameters)
    {
        try
        {
            PageResponse<QuestionResponse> questionPageResponse = _questionService.SearchQuestions(Search, queryParameters);
            return Ok(questionPageResponse);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in QuestionsController while searching! {ExceptionMessage}.", ex.GetBaseException().Message);
            return NotFound(new ProblemDetails
                {
                    Title = "No Questions Found",
                    Detail = "No questions match the specified criteria.",
                    Status = 404,
                    Instance = HttpContext.Request.Path
                }
            );
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
        catch(IndexOutOfRangeException ex)
        {
            return BadRequest(new ProblemDetails
            {
                Title = "Index out of bounds",
                Detail = $"Answer choice index is out of answer choices list bounds",
                Status = 400,
                Instance = HttpContext.Request.Path
            });
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
        catch(IndexOutOfRangeException ex)
        {
            return BadRequest(new ProblemDetails
            {
                Title = "Index out of bounds",
                Detail = $"Answer choice index is out of answer choices list bounds",
                Status = 400,
                Instance = HttpContext.Request.Path
            });
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
