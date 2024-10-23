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
         IndexOutOfRangeException => new ObjectResult(new ProblemDetails
                    {
                        Title = "Index out of range",
                        Detail = $"{context.Exception.Message}",
                        Status = StatusCodes.Status400BadRequest,
                        Instance = context.HttpContext.Request.Path
                    }
                )
                {
                    StatusCode = StatusCodes.Status400BadRequest
                },
            InvalidParagraphIdListException => new ObjectResult(new ProblemDetails
                    {
                        Title = "Invalid paragraph id list",
                        Detail = "The provided list of paragraph IDs does not match the server's list",
                        Status = StatusCodes.Status400BadRequest,
                        Instance = context.HttpContext.Request.Path
                    }
                )
                {
                    StatusCode = StatusCodes.Status400BadRequest
                },
             ResourceAlreadyExistsException => new ObjectResult(new ProblemDetails
                    {
                        Title = "Duplicate resource.",
                        Detail = $"{context.Exception.Message}",
                        Status = StatusCodes.Status400BadRequest,
                        Instance = context.HttpContext.Request.Path
                    }
                )
                {
                    StatusCode = StatusCodes.Status400BadRequest
                },
             ResourceNotFoundException => new ObjectResult(new ProblemDetails
                    {
                        Title = "Specified resource was not found.",
                        Detail = $"{context.Exception.Message}",
                        Status = StatusCodes.Status404NotFound,
                        Instance = context.HttpContext.Request.Path
                    }
                )
                {
                    StatusCode = StatusCodes.Status404NotFound
                },
            ArgumentNullException => new ObjectResult(new ProblemDetails
                    {
                        Title = "Missing arguments",
                        Detail = $"{context.Exception.Message}",
                        Status = StatusCodes.Status400BadRequest,
                        Instance = context.HttpContext.Request.Path
                    }
                )
                {
                    StatusCode = StatusCodes.Status400BadRequest
                },
            UnsupportedFileFormatException => new ObjectResult(new ProblemDetails
                    {
                        Title = "Unsupported file format",
                        Detail = $"Unsupported file extension",
                        Status = StatusCodes.Status400BadRequest,
                        Instance = context.HttpContext.Request.Path
                    }
                )
                {
                    StatusCode = StatusCodes.Status400BadRequest
                },
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
