namespace SpeedReaderAPI.DTOs.Question.Responses;
public record UserInfoResponse(
    long Id,
    string Username,
    double AverageWpm,
    long WordsRead,
    double MinutesRead,
    long CorrectQuestions,
    long TotalQuestions,
    long ArticlesCountRead
);