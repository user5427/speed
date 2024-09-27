using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
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


    [HttpPost]
    public ActionResult<int> CreateParagraph(ParagraphCreateRequest request)
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

            ParagraphResponse paragraphResponse = _paragraphService.CreateParagraph(request);
            return Ok(paragraphResponse);
        }
        catch (KeyNotFoundException ex)
        {
            // Note: every Paragraph is assigned to Article
            _logger.LogError(ex.GetBaseException().Message);
            return NotFound(new ProblemDetails
            {
                Title = "Article Not Found",
                Detail = $"No article found with ID {request.ArticleId}.",
                Status = 404,
                Instance = HttpContext.Request.Path
            });
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ParagraphsController POST! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500,
                   new ProblemDetails
                   {
                       Title = "Internal Server Error",
                       Detail = "An unexpected error occurred while creating the article.",
                       Status = 500,
                       Instance = HttpContext.Request.Path
                   });
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetParagraph(int id)
    {
        try
        {
            ParagraphResponse paragraphResponse = _paragraphService.GetParagraph(id);
            return Ok(paragraphResponse);
        }
        catch (KeyNotFoundException ex)
        {
            _logger.LogError(ex.GetBaseException().Message);
            return NotFound(new ProblemDetails
            {
                Title = "Paragraph Not Found",
                Detail = $"No paragraph found with ID {id}.",
                Status = 404,
                Instance = HttpContext.Request.Path
            });
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ParagraphsController GET BY ID! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500,
                   new ProblemDetails
                   {
                       Title = "Internal Server Error",
                       Detail = $"An unexpected error occurred while retrieving the paragraph with ID {id}.",
                       Status = 500,
                       Instance = HttpContext.Request.Path
                   });
        }
    }


    [HttpPut("{id}")]
    public IActionResult UpdateParagraph(int id, ParagraphUpdateRequest request)
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

            ParagraphResponse paragraphResponse = _paragraphService.UpdateParagraph(id, request);
            return Ok(paragraphResponse);
        }
        catch (KeyNotFoundException ex)
        {
            _logger.LogError(ex.GetBaseException().Message);
            return NotFound(new ProblemDetails
            {
                Title = "Paragraph Not Found",
                Detail = $"No paragraph found with ID {id}.",
                Status = 404,
                Instance = HttpContext.Request.Path
            });
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ParagraphsController while updating with id! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred while updating the paragraph.",
                Status = 500,
                Instance = HttpContext.Request.Path
            });

        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteParagraph(int id)
    {
        try
        {
            _paragraphService.DeleteParagraph(id);
            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ParagraphsController while deleting by id! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred while deleting the article.",
                Status = 500,
                Instance = HttpContext.Request.Path
            });
        }
    }
}
