namespace SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.Entities;

public interface IQuestionService
{
    // CREATE
    Task<Object> CreateQuestionAsync(QuestionRequest request);


    // READ


    // UPDATE
    Task<Object> UpdateQuestionAsync(QuestionRequest request);


    // DELETE
    Task DeleteQuestionAsync(int questionId);
}
