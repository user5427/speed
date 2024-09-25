namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.Entities;

public interface IQuestionService
{
    // CREATE
    Object CreateQuestion(QuestionRequest request);


    // READ


    // UPDATE
    Object UpdateQuestion(QuestionRequest request);


    // DELETE
    void DeleteQuestion(int questionId);
}
