using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace SpeedReaderAPI.Filters;


public class RequestValidationFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            context.Result = new BadRequestObjectResult(new ProblemDetails
                {
                    Title = "Validation Error",
                    Detail = "One or more validation errors occurred.",
                    Status = 410,
                    Instance = context.HttpContext.Request.Path,
                    Extensions = { ["errors"] = context.ModelState }
                });
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
    }
}