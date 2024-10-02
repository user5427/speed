using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question.Responses;
using SpeedReaderAPI.Entities;
namespace SpeedReaderAPI.Services.Impl;


public class QuestionService : IQuestionService
{

    private readonly ApplicationContext _context;
    private readonly IMapper _mapper;

    public QuestionService(ApplicationContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public QuestionResponse GetQuestion(int id)
    {
        Question? question = _context.Question.FirstOrDefault(a => a.Id == id);
        if (question == null)
        {
            throw new KeyNotFoundException($"Question with ID {id} not found.");
        }
        return _mapper.Map<QuestionResponse>(question);

    }
    public QuestionResponse CreateQuestion(QuestionCreateRequest request)
    {
        Paragraph? paragraph = _context.Paragraph.Where(x => x.Id == request.ParagraphId).FirstOrDefault();
        if (paragraph == null)
        {
            throw new KeyNotFoundException($"Paragraph with ID {request.ParagraphId} not found.");
        }

        Question postedQuestion = _mapper.Map<Question>(request);
        _context.Question.Add(postedQuestion);
        _context.SaveChanges();

        return _mapper.Map<QuestionResponse>(postedQuestion);
    }

    public QuestionResponse UpdateQuestion(int id, QuestionUpdateRequest request)
    {
        Question? questionFound = _context.Question.Where(x => x.Id == id).FirstOrDefault();
        if (questionFound == null)
        {
            throw new KeyNotFoundException($"Question with ID {id} not found.");
        }

        // Update if set in request
        if (request.ParagraphId != null)
        {
            questionFound.ParagraphId = (int)request.ParagraphId;
        }
        if (request.AnswerChoices != null)
        {
            questionFound.AnswerChoices = request.AnswerChoices;
        }
        if (request.CorrectAnswerIndex != null)
        {
            questionFound.CorrectAnswerIndex = (int)request.CorrectAnswerIndex;
        }
        if (request.QuestionText != null)
        {
            questionFound.QuestionText = request.QuestionText;
        }

        _context.SaveChanges();
        return _mapper.Map<QuestionResponse>(questionFound);
    }

    public void DeleteQuestion(int id)
    {
        Question? questionFound = _context.Question.Where(x => x.Id == id).FirstOrDefault();
        if (questionFound != null)
        {
            _context.Question.Remove(questionFound);
            _context.SaveChanges();
        }else{
            throw new KeyNotFoundException($"Question with ID {id} not found.");
        }
    }
}
