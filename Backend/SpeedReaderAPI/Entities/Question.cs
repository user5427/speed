namespace SpeedReaderAPI.Entities;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SpeedReaderAPI.Attributes;
using SpeedReaderAPI.Constants;

public class Question
{
	[Key]
    public int Id { get; set; }

	[StringLength(ValidationConstants.MaxTitleLength,
	MinimumLength = ValidationConstants.MinTitleLength,
	ErrorMessage = "Title must be between {2} and {1} characters.")]
	public string? Title { get; set; }

	[ForeignKey(nameof(Paragraph))]
    public int ParagraphId { get; set; }

    [Required(ErrorMessage = "Question text is required.")]
    [StringLength(ValidationConstants.MaxQuestionTextLength,
        MinimumLength = ValidationConstants.MinQuestionTextLength,
        ErrorMessage = "Question text must be between {2} and {1} characters.")]
    public required string QuestionText { get; set; }

    [AnswerChoicesValidation]
    public required string[] AnswerChoices { get; set; }

    [Required(ErrorMessage = "Correct answer choice is required.")]
    [StringLength(ValidationConstants.MaxAnswerChoiceLength,
        ErrorMessage = "Correct answer choice cannot exceed {1} characters.")]
    public int CorrectAnswerIndex { get; set; }

    public string? ImageFileName { get; set; }
    public MimeType? ImageMimeType { get; set; }
    [NotMapped]
    public Image? Image
    {
        get
        {
            if (!string.IsNullOrEmpty(ImageFileName) && ImageMimeType.HasValue)
            {
                return new Image(ImageFileName, ImageMimeType.Value);
            }
            return null; 
        }
        set
        {
            if (value.HasValue)
            {
                ImageFileName = value.Value.ImageFilePath;
                ImageMimeType = value.Value.ImageMimeType;
            }
            else 
            {
                ImageFileName = null;
                ImageMimeType = null;
            }
        }
    }

    public virtual Paragraph? Paragraph { get; set; }
}
