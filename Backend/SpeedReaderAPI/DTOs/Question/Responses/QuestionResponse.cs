namespace SpeedReaderAPI.DTOs.Question.Responses;

public record QuestionResponse(
	int ParagraphId,
    int Id,
    string QuestionText,
    string[] AnswerChoices,
    int CorrectAnswerIndex,
    string? ImageFileName
);

