using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.DTOs;
namespace SpeedReaderAPI.Services.Impl;



public class ParagraphService : IParagraphService
{

    private readonly ApplicationContext _context;
    private readonly IMapper _mapper;

    public ParagraphService(ApplicationContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
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
        Article? articleFound = _context.Article.Where(a => a.Id == request.ArticleId).FirstOrDefault();
        if (articleFound == null)
        {
            throw new KeyNotFoundException($"Article with ID {request.ArticleId} not found.");
        }

        Paragraph createdParagraph = _mapper.Map<Paragraph>(request);
        if(createdParagraph.QuestionIds == null){
            createdParagraph.QuestionIds = new List<int>();
        }
		_context.Paragraph.Add(createdParagraph);
        _context.SaveChanges();



        if (articleFound.ParagraphIds == null) {
			articleFound.ParagraphIds = new List<int>();
		}
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

		Article? articleFound = _context.Article.Where(a => a.Id == paragraphFound.ArticleId).FirstOrDefault();

		// Update if set in request
		if (request.articleId != null)
        {
            paragraphFound.ArticleId = (int)request.articleId;
			if (articleFound != null && 
                articleFound.Id != paragraphFound.ArticleId && 
                articleFound.ParagraphIds != null
				&& articleFound.ParagraphIds.Contains(paragraphFound.Id) //<-- del saugumo jei norit atkomentuokit (jau atkomentuota)
				) {
				articleFound.ParagraphIds.Remove(paragraphFound.Id);
                var changedArticle = _context.Article.Where(x => x.Id == paragraphFound.ArticleId).FirstOrDefault();
				if (changedArticle == null) {
					throw new KeyNotFoundException($"Article with ID {paragraphFound.ArticleId} not found.");
				}
				if (changedArticle.ParagraphIds == null) {
                    changedArticle.ParagraphIds = new List<int>();
				}
                changedArticle.ParagraphIds.Add(paragraphFound.Id);
			}
		}
		if (request.Title != null) {
			paragraphFound.Title = request.Title;
		}
		if (request.Text != null)
        {
            paragraphFound.Text = request.Text;
        }
        if (request.NextParagraphId != null)
        {
            paragraphFound.nextParagraphId = request.NextParagraphId;
        }
		
		_context.SaveChanges();

		return _mapper.Map<ParagraphResponse>(paragraphFound);
    }

    public void DeleteParagraph(int id)
    {
        Paragraph? paragraphFound = _context.Paragraph.Where(x => x.Id == id).FirstOrDefault();
        if (paragraphFound != null)
        {
			Article? articleFound = _context.Article.Where(a => a.Id == paragraphFound.ArticleId).FirstOrDefault();
			if (articleFound != null &&
				articleFound.Id == paragraphFound.ArticleId &&
				articleFound.ParagraphIds != null && 
                articleFound.ParagraphIds.Contains(paragraphFound.Id)
				) {
				articleFound.ParagraphIds.Remove(paragraphFound.Id);
			}
			_context.Paragraph.Remove(paragraphFound);
            _context.SaveChanges();
        }else{
            throw new KeyNotFoundException($"Question with ID {id} not found.");
        }
    }

    public ParagraphPageResponse SearchParagraphs(string Search, QueryParameters queryParameters)
    {
        if (Search == null)
        {
            throw new ArgumentNullException("Search query parameter is required.");
        }
        long paragraphCount = _context.Paragraph.Count();
        List<Paragraph> paragraphs = _context.Paragraph
                                        .Where(a => a.Title.Contains(Search))
                                        .Skip((queryParameters.PageNumber - 1) * queryParameters.PageSize)
                                        .Take(queryParameters.PageSize)
                                        .ToList();
        List<ParagraphResponse> paragraphResponseList = _mapper.Map<List<ParagraphResponse>>(paragraphs);
        return new ParagraphPageResponse(paragraphCount, paragraphResponseList);
    }
}
