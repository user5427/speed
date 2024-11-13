using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ValidationSettingsController : ControllerBase
{
    private readonly IValidationSettingsService _validationSettings;
    private readonly ILogger<ValidationSettingsController> _logger;

    public ValidationSettingsController(ILogger<ValidationSettingsController> logger,
        IValidationSettingsService validationSettings)
    {
        _logger = logger;
        _validationSettings = validationSettings;
    }

    [HttpGet]
    public IActionResult GetValidationSettings()
    {
        var settings = _validationSettings.GetValidationSettings();
        return Ok(settings);
    }

    [HttpPut]
    public IActionResult UpdateValidationSettings(ValidationSettingsUpdateRequest request)
    {
        var settings = _validationSettings.UpdateValidationSettings(request);
        return Ok(settings);
    }
}