using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Question.Requests;
using SpeedReaderAPI.DTOs.Question.Responses;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;
using System.Linq;
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

        Question createdQuestion = _mapper.Map<Question>(request);
        _context.Question.Add(createdQuestion);
        _context.SaveChanges();



		if (paragraphFound.QuestionIds == null) {
			paragraphFound.QuestionIds = new List<int>();
		}
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

		var paragraphFound = _context.Paragraph.Where(a => a.Id == questionFound.ParagraphId).FirstOrDefault();

		// Update if set in request
		if (request.ParagraphId != null)
        {
            questionFound.ParagraphId = (int)request.ParagraphId;
			if (paragraphFound != null &&
				paragraphFound.Id != questionFound.ParagraphId &&
				paragraphFound.QuestionIds != null
				&& paragraphFound.QuestionIds.Contains(questionFound.Id) //<-- del saugumo jei norit atkomentuokit (jau atkomentuota)
				) {
				paragraphFound.QuestionIds.Remove(questionFound.Id);
				var changedParagraph = _context.Paragraph.Where(x => x.Id == questionFound.ParagraphId).FirstOrDefault();
				if (changedParagraph == null) {
                     throw new KeyNotFoundException($"Paragraph with ID {request.ParagraphId} not found.");
				}
				if (changedParagraph.QuestionIds == null) {
					changedParagraph.QuestionIds = new List<int>();
				}
				changedParagraph.QuestionIds.Add(questionFound.Id);
			}
		}
		if (request.Title != null) {
			questionFound.Title = request.Title;
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
			if (paragraphFound != null &&
				paragraphFound.Id == questionFound.ParagraphId &&
				paragraphFound.QuestionIds != null &&
				paragraphFound.QuestionIds.Contains(questionFound.Id)
				) {
				paragraphFound.QuestionIds.Remove(questionFound.Id);
			}
			_context.Question.Remove(questionFound);
            _context.SaveChanges();
        }else{
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
