namespace SpeedReaderAPI.Filters;
using SpeedReaderAPI.Exceptions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

public class ExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {

        context.Result = context.Exception switch
        {
            IndexOutOfRangeException => new BadRequestObjectResult(new ProblemDetails
            {
                Title = "Index out of range",
                Detail = $"{context.Exception.Message}",
                Status = StatusCodes.Status400BadRequest,
                Instance = context.HttpContext.Request.Path
            }
                   ),
            InvalidParagraphIdListException => new BadRequestObjectResult(new ProblemDetails
            {
                Title = "Invalid paragraph id list",
                Detail = "The provided list of paragraph IDs does not match the server's list",
                Status = StatusCodes.Status400BadRequest,
                Instance = context.HttpContext.Request.Path
            }
                ),
            ResourceAlreadyExistsException => new BadRequestObjectResult(new ProblemDetails
            {
                Title = "Duplicate resource.",
                Detail = $"{context.Exception.Message}",
                Status = StatusCodes.Status400BadRequest,
                Instance = context.HttpContext.Request.Path
            }
               ),
            ResourceNotFoundException => new NotFoundObjectResult(new ProblemDetails
            {
                Title = "Specified resource was not found.",
                Detail = $"{context.Exception.Message}",
                Status = StatusCodes.Status404NotFound,
                Instance = context.HttpContext.Request.Path
            }
               ),
            ArgumentNullException => new BadRequestObjectResult(new ProblemDetails
            {
                Title = "Missing arguments",
                Detail = $"{context.Exception.Message}",
                Status = StatusCodes.Status400BadRequest,
                Instance = context.HttpContext.Request.Path
            }
                ),
            UnsupportedFileFormatException => new BadRequestObjectResult(new ProblemDetails
            {
                Title = "Unsupported file format",
                Detail = $"Unsupported file extension",
                Status = StatusCodes.Status400BadRequest,
                Instance = context.HttpContext.Request.Path
            }
                ),
            _ => new ObjectResult(new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An unexpected error occurred.",
                Status = StatusCodes.Status500InternalServerError,
                Instance = context.HttpContext.Request.Path
            })
            {
                StatusCode = StatusCodes.Status500InternalServerError
            }
        };
        context.ExceptionHandled = true;
    }
}