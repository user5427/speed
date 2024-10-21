using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services;
namespace SpeedReaderAPI.Controllers;

using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;
using SpeedReaderAPI.Services;

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
            ParagraphResponse result = await _paragraphService.UploadImage(id, request);
            return Ok(result);
        } 
        catch(KeyNotFoundException ex) 
        {
            _logger.LogError("Something went wrong in ParagraphsController while uploading image {ExceptionMessage}.", ex.GetBaseException().Message);
            return NotFound(
                    new ProblemDetails
                    {
                        Title = "No Paragraphs Found",
                        Detail = "No paragraphs match the specified criteria.",
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
                        Detail = "No paragraphs match the specified criteria.",
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
            _logger.LogError("Something went wrong in ParagraphsController UploadImage! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500,
                   new ProblemDetails
                   {
                       Title = "Internal Server Error",
                       Detail = "An unexpected error occurred while creating the pargraph image.",
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
            _paragraphService.DeleteImage(id);
            return Ok("Deleted");
        } 
        catch(KeyNotFoundException ex) 
        {
            _logger.LogError("Something went wrong in ParagraphsController while deleting image {ExceptionMessage}.", ex.GetBaseException().Message);
            return NotFound(
                    new ProblemDetails
                    {
                        Title = "No Paragraph Found",
                        Detail = "No paragraphs match the specified criteria.",
                        Status = 404,
                        Instance = HttpContext.Request.Path
                    }
                );
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ParagraphController while deleting image! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred while deleting the paragraph image.",
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
            var imageResult = _paragraphService.GetImage(id);

            // Check if the image result is null or does not have a file stream
            if (imageResult == null || !imageResult.HasValue || imageResult.Value.FileStream == null)
            {
                 return NotFound(
                    new ProblemDetails
                    {
                        Title = "No Image Found",
                        Detail = "Paragraph does not have an image.",
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
            _logger.LogError("Something went wrong in ParagraphsController while getting an image {ExceptionMessage}.", ex.GetBaseException().Message);
            return NotFound(
                    new ProblemDetails
                    {
                        Title = "No Paragraph Found",
                        Detail = "No paragraphs match the specified criteria.",
                        Status = 404,
                        Instance = HttpContext.Request.Path
                    }
                );
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ParagraphsController while getting an image! {ExceptionMessage}.", ex.GetBaseException().Message);
            return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred while deleting the paragraph img.",
                Status = 500,
                Instance = HttpContext.Request.Path
            });
        }
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

    [HttpGet("search/")]
    public IActionResult SearchParagraphs([FromQuery] QueryParameters queryParameters)
    {
        try
        {
            PageResponse<ParagraphResponse> paragraphs = _paragraphService.SearchParagraphs(queryParameters);
            return Ok(paragraphs);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong in ParagraphsController while searching! {ExceptionMessage}.", ex.GetBaseException().Message);
            return NotFound(new ProblemDetails
                {
                    Title = "No Paragraphs Found",
                    Detail = "No paragraphs match the specified criteria.",
                    Status = 404,
                    Instance = HttpContext.Request.Path
                }
            );
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
            return Ok("Deleted");
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
