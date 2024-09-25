using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question.Responses;
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
    public Object CreateQuestion(QuestionRequest request)
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
            _context.SaveChanges();

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

    public Object UpdateQuestion(QuestionRequest request)
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
            questionFound.CorrectAnswerIndex = postedQuestion.CorrectAnswerIndex;

            _context.SaveChanges();

            var responseData = _mapper.Map<QuestionResponse>(questionFound);
            return responseData;
        }
        catch (Exception)
        {

            throw;
        }
    }

    // DELETE
    public void DeleteQuestion(int questionId)
    {
        try
        {
            var questionFound = _context.Question.Where(x => x.Id == questionId).FirstOrDefault();

            if (questionFound == null)
            {
                throw new Exception("Question not found!");
            }

            _context.Question.Remove(questionFound);
            _context.SaveChanges();
        }
        catch (Exception)
        {

            throw;
        }
    }
}
