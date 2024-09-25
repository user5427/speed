using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Article.Responses;
using SpeedReaderAPI.DTOs.Paragraph;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.Entities;
namespace SpeedReaderAPI.Services;


public class ParagraphService : IParagraphService
{

    private readonly ApplicationContext _context;
    private readonly IMapper _mapper;

    public ParagraphService(ApplicationContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

   public ParagraphDTO GetParagraph(int id)
    {
        return _mapper.Map<ParagraphDTO>(_context.Paragraph.FirstOrDefault(a => a.Id == id));

    }

    public Object CreateParagraph(ParagraphRequest request)
    {

        try
        {
            Article article = _mapper.Map<Article>(_context.Article.FirstOrDefault(a => a.Id == request.ArticleId));
            
            var postedParagraph = _mapper.Map<Paragraph>(request);

            _context.Paragraph.Add(postedParagraph);
            _context.SaveChanges();

            CreateParagraphResponse responseData = _mapper.Map<CreateParagraphResponse>(postedParagraph);
            article.ParagraphIds.Add(responseData.Id);
            _context.SaveChanges();
            return responseData;
        }
        catch (Exception)
        {

            throw;
        }
    }

    public Object UpdateParagraph(ParagraphRequest request)
    {
        try
        {
            Paragraph postedParagraph = _mapper.Map<Paragraph>(request);
            Console.WriteLine(postedParagraph.Id);
            var paragraphFound = _context.Paragraph.Where(x => x.Id == postedParagraph.Id).FirstOrDefault();
            if (paragraphFound == null)
            {
                throw new Exception("Paragraph not found!");
            }

            paragraphFound.Text = postedParagraph.Text;
            paragraphFound.ArticleId = postedParagraph.ArticleId;
            Article old = _context.Article.Where(x => x.Id == postedParagraph.ArticleId).FirstOrDefault();
            old.ParagraphIds.Remove(postedParagraph.Id);
            Article newer = _context.Article.Where(x => x.Id == paragraphFound.ArticleId).FirstOrDefault();
            newer.ParagraphIds.Add(paragraphFound.Id);
           // paragraphFound.Questions = postedParagraph.Questions;

            _context.SaveChanges();

            var responseData = _mapper.Map<CreateParagraphResponse>(paragraphFound);
            return responseData;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public void DeleteParagraph(int paragraphId)
    {
        try
        {
            Paragraph paragrapghFound = _context.Paragraph.Where(x => x.Id == paragraphId).FirstOrDefault();
            Article a = _context.Article.Where(x => x.Id == paragrapghFound.ArticleId).FirstOrDefault();
            a.ParagraphIds.Remove(paragraphId);
            if (paragrapghFound == null)
            {
                throw new Exception("Paragraph not found!");
            }

            _context.Paragraph.Remove(paragrapghFound);
            _context.SaveChanges();
        }
        catch (Exception)
        {

            throw;
        }
    }
}
