using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Requests;
namespace SpeedReaderAPI.Services;


public class QuestionService : IQuestionService
{

    private readonly ApplicationContext _context;

    public QuestionService(ApplicationContext context)
    {
        _context = context;
    }

    // CREATE
    public async Task<Question> CreateQuestionAsync(int paragraphId, QuestionRequest request)
    {
        var paragraph = await _context.Paragraph.FindAsync(paragraphId)
                            ?? throw new Exception("Paragraph not found!");
        var question = new Question
        {
            ParagraphId = paragraphId,
            QuestionText = request.Question,
            AnswerChoices = request.AnswerChoices,
            CorrectAnswerChoice = request.CorrectAnswerChoice
        };

        _context.Question.Add(question);
        await _context.SaveChangesAsync();

        return question;
    }

    // READ

    // UPDATE

    public async Task<Question> UpdateQuestionAsync(int questionId, QuestionRequest request)
    {
        var question = await _context.Question.FindAsync(questionId)
                            ?? throw new Exception("Question not found!");

        question.QuestionText = request.Question;
        question.AnswerChoices = request.AnswerChoices;
        question.CorrectAnswerChoice = request.CorrectAnswerChoice;

        await _context.SaveChangesAsync();
        return question;
    }

    // DELETE
    public async Task DeleteQuestionAsync(int questionId)
    {
        var question = await _context.Question.FindAsync(questionId);
        if (question == null) return;

        _context.Question.Remove(question);
        await _context.SaveChangesAsync();
    }

}