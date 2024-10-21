using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Exceptions;
using SpeedReaderAPI.Constants;
namespace SpeedReaderAPI.Services.Impl;



public class ParagraphService : IParagraphService
{

    private readonly ApplicationContext _context;
    private readonly IMapper _mapper;
    private readonly IImageService  _imageService;
    private readonly IQuestionService _questionService;
    public ParagraphService(ApplicationContext context, IMapper mapper, IImageService imageService, IQuestionService questionService)
    {
        _context = context;
        _mapper = mapper;
        _imageService = imageService;
        _questionService = questionService;
    }

    public ParagraphResponse GetParagraph(int id)
    {
        Paragraph? paragraph = _context.Paragraph.Where(a => a.Id == id).FirstOrDefault();
        if (paragraph == null)
        {
            throw new KeyNotFoundException($"Paragraph with ID {id} not found.");
        }

        return _mapper.Map<ParagraphResponse>(paragraph);

    }

   public ParagraphResponse CreateParagraph(ParagraphCreateRequest request)
    {
        Article? articleFound = _context.Article
            .FirstOrDefault(a => a.Id == request.ArticleId);

        if (articleFound == null)
        {
            throw new KeyNotFoundException($"Article with ID {request.ArticleId} not found.");
        }

        Paragraph createdParagraph = _mapper.Map<Paragraph>(request);

        _context.Paragraph.Add(createdParagraph);
        _context.SaveChanges(); 
        articleFound.ParagraphIds.Add(createdParagraph.Id);
        _context.SaveChanges(); 

        return _mapper.Map<ParagraphResponse>(createdParagraph);
    }


    public ParagraphResponse UpdateParagraph(int id, ParagraphUpdateRequest request)
    {
        Paragraph? paragraphFound = _context.Paragraph.Where(x => x.Id == id).FirstOrDefault();
        if (paragraphFound == null)
        {
            throw new KeyNotFoundException($"Paragraph with ID {id} not found.");
        }

		Article? oldArticleFound = _context.Article.Where(a => a.Id == paragraphFound.ArticleId).FirstOrDefault();
        if (oldArticleFound == null) throw new Exception("Illegal state, article  of paragraph must exist");

		// Update if set in request
		if (request.articleId != null)
        {
            Article? newArticleFound =  _context.Article.Where(a => a.Id == request.articleId).FirstOrDefault();
            if (newArticleFound == null)
            {
			    throw new KeyNotFoundException($"Article with ID {request.articleId} not found.");
            }

            oldArticleFound.ParagraphIds.Remove(id);
            newArticleFound.ParagraphIds.Add(id);
            paragraphFound.ArticleId = newArticleFound.Id;
		}
		if (request.Title != null) {
			paragraphFound.Title = request.Title;
		}
		if (request.Text != null)
        {
            paragraphFound.Text = request.Text;
        }

		_context.SaveChanges();
		return _mapper.Map<ParagraphResponse>(paragraphFound);
    }

    public void DeleteParagraph(int id)
    {
        Paragraph? paragraphFound = _context.Paragraph.Where(x => x.Id == id).FirstOrDefault();
        if (paragraphFound != null)
        {
			Article? articleFound = _context.Article
                                        .Where(a => a.Id == paragraphFound.ArticleId).FirstOrDefault();
			if (articleFound == null) throw new Exception("Illegal state, article  of paragraph must exist");

            articleFound.ParagraphIds.Remove(id);

            if (paragraphFound.Image != null && paragraphFound.Image.HasValue) 
            {
                _imageService.Delete((Image)paragraphFound.Image);
            }
            var copyOfQuestionIds = paragraphFound.QuestionIds.ToList();
            copyOfQuestionIds.ForEach(_questionService.DeleteQuestion);
			_context.Paragraph.Remove(paragraphFound);
            _context.SaveChanges();
        }
        else
        {
            throw new KeyNotFoundException($"Question with ID {id} not found.");
        }
    }

    public PageResponse<ParagraphResponse> SearchParagraphs(QueryParameters queryParameters)
    {
        long paragraphCount = _context.Paragraph.Count();
        List<Paragraph> paragraphs = _context.Paragraph
                                        .Where(a => string.IsNullOrEmpty(queryParameters.Search) || a.Title.Contains(queryParameters.Search))
                                        .Skip((queryParameters.PageNumber - 1) * queryParameters.PageSize)
                                        .Take(queryParameters.PageSize)
                                        .ToList();
        List<ParagraphResponse> paragraphResponseList = _mapper.Map<List<ParagraphResponse>>(paragraphs);
        return new PageResponse<ParagraphResponse>(paragraphCount, paragraphResponseList);
    }

    public async Task<ParagraphResponse> UploadImage(int id, ImageUploadRequest request)
    {
        Paragraph? paragraphFound = _context.Paragraph.Where(a => a.Id == id).FirstOrDefault();
        if (paragraphFound == null) 
        {
            throw new KeyNotFoundException($"Paragraph with ID {id} not found.");
        }
        if (paragraphFound.Image.HasValue) 
        {
            throw new ResourceAlreadyExistsException($"Paragraph with ID {id} has an image.");
        }
        paragraphFound.Image = await _imageService.Create(request);
        await _context.SaveChangesAsync();

        return _mapper.Map<ParagraphResponse>(paragraphFound);
    }

    public Image? GetImage(int id)
    {
        Paragraph? paragraphFound = _context.Paragraph.Where(a => a.Id == id).FirstOrDefault();
        if (paragraphFound == null) 
        {
            throw new KeyNotFoundException($"Paragraph with ID {id} not found.");
        }
        if (!paragraphFound.Image.HasValue) return null;
        Image img = paragraphFound.Image.Value;
        Stream? stream = _imageService.Get(img);
        if (stream == null) return null;
        img.FileStream = stream;
        
        return img;
    }

    public void DeleteImage(int id)
    {
        Paragraph? paragraphFound = _context.Paragraph.Where(a => a.Id == id).FirstOrDefault();
        if (paragraphFound == null) 
        {
            throw new KeyNotFoundException($"Paragraph with ID {id} not found.");
        }
        if (paragraphFound.Image == null || !paragraphFound.Image.HasValue) return;
        _imageService.Delete((Image)paragraphFound.Image);
        
        paragraphFound.Image = null;
        _context.SaveChanges();
    }
}
