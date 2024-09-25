using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Paragraph;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question.Responses;
using SpeedReaderAPI.DTOs.Question;
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

    public QuestionDTO GetQuestion(int id)
    {
        return _mapper.Map<QuestionDTO>(_context.Question.FirstOrDefault(a => a.Id == id));

    }
    public Object CreateQuestion(QuestionRequest request)
    {
        try
        {
            
            var postedQuestion = _mapper.Map<Question>(request);
           
            var paragraphId = request.ParagraphId;
            Paragraph paragraph = _context.Paragraph.Where(x => x.Id == paragraphId).FirstOrDefault();
            
            if (paragraph == null)
            {
                throw new Exception("Paragraph not found!");
            }
            
            _context.Question.Add(postedQuestion);
            _context.SaveChanges();
            
            var responseData = _mapper.Map<QuestionResponse>(postedQuestion);
            paragraph.QuestionIds.Add(responseData.Id);
            _context.SaveChanges();
            return responseData;
        }
        catch (Exception)
        {

            throw;
        }
    }
    /// <summary>
    /// DOENS'T WORK!!! DO NOT USE UNLESS YOU SPECIFY EVERYTHING
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
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
            Console.WriteLine(postedQuestion.ParagraphId);
            questionFound.ParagraphId = postedQuestion.ParagraphId;
            Paragraph old = _context.Paragraph.Where(x => x.Id == postedQuestion.ParagraphId).FirstOrDefault();
            old.QuestionIds.Remove(postedQuestion.Id);
            Paragraph newer = _context.Paragraph.Where(x => x.Id == questionFound.ParagraphId).FirstOrDefault();
            newer.QuestionIds.Add(postedQuestion.Id);
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

    public void DeleteQuestion(int questionId)
    {
        try
        {
            Question questionFound = _context.Question.Where(x => x.Id == questionId).FirstOrDefault();
            Paragraph p = _context.Paragraph.Where(x => x.Id == questionFound.ParagraphId).FirstOrDefault();
            p.QuestionIds.Remove(questionId);
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
