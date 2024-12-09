namespace SpeedReaderAPI.DTOs.Article.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

public record ArticleCreateRequest
(
    [Required(ErrorMessage = "Title is required.")]
    [StringLength(ValidationConstants.MaxTitleLength,
        MinimumLength = ValidationConstants.MinTitleLength,
        ErrorMessage = "Title must be between {2} and {1} characters.")]
    string Title,
    string? CategoryTitle,
    string? Author,
    string? Publisher,
    string? Url,
    string? Language,
    List<int>? CategoryIds
);
