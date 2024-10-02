namespace SpeedReaderAPI.DTOs.Question.Responses;

public record QuestionResponse(
	string Title,
	int ParagraphId,
    int Id,
    string QuestionText,
    string[] AnswerChoices,
    int CorrectAnswerIndex
);

