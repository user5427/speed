namespace SpeedReaderAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.Services;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UsersController> _logger;

    public UsersController(ILogger<UsersController> logger,
     IUserService userService)
    {
        _logger = logger;
        _userService = userService;
    }

    [HttpGet("me")]
    [Authorize(Roles = "USER,ADMIN")]
    public IActionResult GetMyData()
    {
        var result = _userService.GetMyInfo();
        return Ok(result);
    }
}