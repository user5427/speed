namespace SpeedReaderAPI.DTOs.Paragraph.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Constants;

public record ParagraphUpdateRequest(
    int? articleId,
    [StringLength(ValidationConstants.MaxParagraphLength,
        MinimumLength = ValidationConstants.MinParagraphLength,
        ErrorMessage = "Text must be between {2} and {1} characters.")]
    string? Text,
	int? NextParagraphId,
	List<int>? QuestionIds
	);
