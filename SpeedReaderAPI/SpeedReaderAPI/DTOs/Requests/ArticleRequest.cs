namespace SpeedReaderAPI.DTOs.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

public class ArticleRequest
{

    [Required(ErrorMessage = "Title is required.")]
    [StringLength(ValidationConstants.MaxTitleLength,
         MinimumLength = ValidationConstants.MinTitleLength,
         ErrorMessage = "Title must be between {2} and {1} characters.")]
    public string Title { get; init; }
}
