namespace SpeedReaderAPI.DTOs.Article.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

public record ArticleUpdateRequest
(
    [StringLength(ValidationConstants.MaxTitleLength,
        MinimumLength = ValidationConstants.MinTitleLength,
        ErrorMessage = "Title must be between {2} and {1} characters.")]
    string? Title,
    string? CategoryTitle,
    List<int>? ParagraphIds
);
