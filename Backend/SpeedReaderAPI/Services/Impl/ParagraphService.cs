using AutoMapper;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.Entities;
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
        _context.Paragraph.Add(createdParagraph);
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

        // Update if set in request
        if (request.articleId != null)
        {
            paragraphFound.ArticleId = (int)request.articleId;
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
            _context.Paragraph.Remove(paragraphFound);
            _context.SaveChanges();
        }
    }
}
