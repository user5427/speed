namespace SpeedReaderAPI.DTOs.Question.Responses;
public record QuestionPageResponse(long Count, ICollection<QuestionResponse> Questions);