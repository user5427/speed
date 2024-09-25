namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs.Paragraph;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question;
using SpeedReaderAPI.Entities;

public interface IQuestionService
{
    Object CreateQuestion(QuestionRequest request);

    public QuestionDTO GetQuestion(int id);

    Object UpdateQuestion(QuestionRequest request);


    void DeleteQuestion(int questionId);
}
