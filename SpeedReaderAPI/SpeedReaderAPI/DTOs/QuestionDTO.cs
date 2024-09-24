namespace SpeedReaderAPI.DTOs;

public class QuestionDTO {
    public int Id { get; set; }
    public string Question { get; set; }
    public string[] AnswerChoices { get; set; }
    public int CorrectAnswerIndex { get; set; }
}
