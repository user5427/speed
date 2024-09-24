using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.DTOs.Responses;
using SpeedReaderAPI.Entities;
namespace SpeedReaderAPI.Services;


public class QuestionService : IQuestionService
{

    private readonly ApplicationContext _context;
    private readonly IMapper _mapper;

    public QuestionService(ApplicationContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    // CREATE
    public async Task<Object> CreateQuestionAsync(QuestionRequest request)
    {

        try
        {
            var postedQuestion = _mapper.Map<Question>(request);

            var paragraphId = request.ParagraphId;
            var paragraph = _context.Paragraph.Where(x => x.Id == paragraphId).FirstOrDefault();
            if (paragraph == null)
            {
                throw new Exception("Paragraph not found!");
            }

            _context.Question.Add(postedQuestion);
            await _context.SaveChangesAsync();

            var responseData = _mapper.Map<QuestionResponse>(postedQuestion);
            return responseData;
        }
        catch (Exception)
        {

            throw;
        }
    }

    // READ

    // UPDATE

    public async Task<Object> UpdateQuestionAsync(QuestionRequest request)
    {
        try
        {
            var postedQuestion = _mapper.Map<Question>(request);
            var questionFound = _context.Question.Where(x => x.Id == postedQuestion.Id).FirstOrDefault();
            if (questionFound == null)
            {
                throw new Exception("Question not found!");
            }

            questionFound.ParagraphId = postedQuestion.ParagraphId;
            questionFound.QuestionText = postedQuestion.QuestionText;
            questionFound.AnswerChoices = postedQuestion.AnswerChoices;
            questionFound.CorrectAnswerChoice = postedQuestion.CorrectAnswerChoice;

            await _context.SaveChangesAsync();

            var responseData = _mapper.Map<QuestionResponse>(questionFound);
            return responseData;
        }
        catch (Exception)
        {

            throw;
        }
    }

    // DELETE
    public async Task DeleteQuestionAsync(int questionId)
    {
        try
        {
            var questionFound = _context.Question.Where(x => x.Id == questionId).FirstOrDefault();

            if (questionFound == null)
            {
                throw new Exception("Question not found!");
            }

            _context.Question.Remove(questionFound);
            await _context.SaveChangesAsync();
        }
        catch (Exception)
        {

            throw;
        }
    }
}
