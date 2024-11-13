namespace SpeedReaderAPI.Controllers;

using Microsoft.AspNetCore.Mvc;
using SpeedReaderAPI.DTOs.ArticleSession.Requests;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs.ArticleSession.Responses;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/[controller]")]
public class ArticleSessionsController : ControllerBase
{
    private readonly IArticleSessionService _articleSessionService;
    private readonly ILogger<ArticleSessionsController> _logger;

    public ArticleSessionsController(ILogger<ArticleSessionsController> logger,
     IArticleSessionService articleSessionService)
    {
        _logger = logger;
        _articleSessionService = articleSessionService;
    }

    [HttpPost]
    [Authorize("USER,ADMIN")]
    public async Task<IActionResult> Create(ArticleSessionCreateRequest request)
    {
        ArticleSessionResponse result = await _articleSessionService.CreateArticleSession(request);
        return Ok(result);
    }
}