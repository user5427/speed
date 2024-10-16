using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question.Responses;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;
namespace SpeedReaderAPI.Services.Impl;


public class QuestionService : IQuestionService
{

    private readonly ApplicationContext _context;
    private readonly IMapper _mapper;
    private readonly IImageService _imageService;
    public QuestionService(ApplicationContext context, IMapper mapper, IImageService imageService)
    {
        _context = context;
        _mapper = mapper;
        _imageService = imageService;
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
        Paragraph? paragraphFound = _context.Paragraph.Where(x => x.Id == request.ParagraphId).FirstOrDefault();
        if (paragraphFound == null)
        {
            throw new KeyNotFoundException($"Paragraph with ID {request.ParagraphId} not found.");
        }

        if (request.CorrectAnswerIndex < 0 || request.CorrectAnswerIndex >= request.AnswerChoices.Length)
        {
            throw new IndexOutOfRangeException("Correct answer index out of bounds");
        }

        Question createdQuestion = _mapper.Map<Question>(request);
        _context.Question.Add(createdQuestion);
        _context.SaveChanges();
        paragraphFound.QuestionIds.Add(createdQuestion.Id);
        _context.SaveChanges();

		return _mapper.Map<QuestionResponse>(createdQuestion);
    }

    public QuestionResponse UpdateQuestion(int id, QuestionUpdateRequest request)
    {
        Question? questionFound = _context.Question.Where(x => x.Id == id).FirstOrDefault();
        if (questionFound == null)
        {
            throw new KeyNotFoundException($"Question with ID {id} not found.");
        }

		Paragraph? oldParagraphFound = _context.Paragraph.Where(a => a.Id == questionFound.ParagraphId).FirstOrDefault();
        if (oldParagraphFound == null) throw new Exception("Illegal state, paragraph of question must exist");
		
        if (request.CorrectAnswerIndex != null)
        {
            bool isIndexOutOfRequestBounds = request.AnswerChoices != null &&
                                     request.CorrectAnswerIndex >= request.AnswerChoices.Length;
            bool isIndexOutOfQuestionBounds = request.AnswerChoices == null &&
                                        request.CorrectAnswerIndex >= questionFound.AnswerChoices.Length;
            if (request.CorrectAnswerIndex < 0 || isIndexOutOfRequestBounds || isIndexOutOfQuestionBounds)
            {
                throw new IndexOutOfRangeException("Correct answer index is out of bounds.");
            }
        }
       else if (request.AnswerChoices != null) 
       {
            if (questionFound.CorrectAnswerIndex >= request.AnswerChoices.Length)
            {
                throw new IndexOutOfRangeException("Correct answer index is out of bounds.");
            }
       }

        // Update if set in request
		if (request.ParagraphId != null)
        {
            Paragraph? newParagrahFound =  _context.Paragraph.Where(a => a.Id == request.ParagraphId).FirstOrDefault();
            if (newParagrahFound == null)
            {
			    throw new KeyNotFoundException($"Paragraph with ID {request.ParagraphId} not found.");
            }
            oldParagraphFound.QuestionIds.Remove(id);
            newParagrahFound.QuestionIds.Add(id);
            questionFound.ParagraphId = newParagrahFound.Id;
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
			Paragraph? paragraphFound = _context.Paragraph.Where(a => a.Id == questionFound.ParagraphId).FirstOrDefault();
			if (paragraphFound == null) throw new Exception("Illegal state, paragraph  of question must exist");
			paragraphFound.QuestionIds.Remove(id);
            
            if (questionFound.ImageFileName != null && questionFound.Image.HasValue) 
            {
                _imageService.Delete((Image)questionFound.Image);
            }
			_context.Question.Remove(questionFound);
            _context.SaveChanges();
        }
        else
        {
            throw new KeyNotFoundException($"Question with ID {id} not found.");
        }
    }

    public async Task<QuestionResponse> UploadImage(int id, ImageUploadRequest request)
    {
        Question? questionFound = _context.Question.Where(a => a.Id == id).FirstOrDefault();
        if (questionFound == null) 
        {
            throw new KeyNotFoundException($"Question with ID {id} not found.");
        }
        if (questionFound.Image.HasValue) 
        {
            throw new ResourceAlreadyExistsException($"Paragraph with ID {id} has an image.");
        }
        questionFound.Image = await _imageService.Create(request);
        await _context.SaveChangesAsync();

        return _mapper.Map<QuestionResponse>(questionFound);
    }

    public Image? GetImage(int id)
    {
        Question? questionFound = _context.Question.Where(a => a.Id == id).FirstOrDefault();
        if (questionFound == null) 
        {
            throw new KeyNotFoundException($"Question with ID {id} not found.");
        }
        if (!questionFound.Image.HasValue) return null;
        Image img = questionFound.Image.Value;
        Stream? stream = _imageService.Get(img);
        if (stream == null) return null;
        img.FileStream = stream;
        
        return img;
    }

    public void DeleteImage(int id)
    {
        Question? questionFound = _context.Question.Where(a => a.Id == id).FirstOrDefault();
        if (questionFound == null) 
        {
            throw new KeyNotFoundException($"Question with ID {id} not found.");
        }
        if (questionFound.Image == null || !questionFound.Image.HasValue) return;
        _imageService.Delete((Image)questionFound.Image);
        
        questionFound.Image = null;
        _context.SaveChanges();
    }
}
