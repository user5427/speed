namespace SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.Entities;

public interface IQuestionService
{
    // CREATE
    Task<Question> CreateQuestionAsync(int paragraphId, QuestionRequest request);


    // READ


    // UPDATE
    Task<Question> UpdateQuestionAsync(int questionId, QuestionRequest request);


    // DELETE
    Task DeleteQuestionAsync(int questionId);
}
