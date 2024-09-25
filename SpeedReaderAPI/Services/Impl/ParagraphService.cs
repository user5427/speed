using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
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

    // CREATE

    public Object CreateParagraph(ParagraphRequest request)
    {
        try
        {
            var postedParagraph = _mapper.Map<Paragraph>(request);

            _context.Paragraph.Add(postedParagraph);
            _context.SaveChanges();

            var responseData = _mapper.Map<CreateParagraphResponse>(postedParagraph);
            return responseData;
        }
        catch (Exception)
        {

            throw;
        }
    }

    // READ

    // UPDATE

    public Object UpdateParagraph(ParagraphRequest request)
    {
        try
        {
            var postedParagraph = _mapper.Map<Paragraph>(request);
            var paragraphFound = _context.Paragraph.Where(x => x.Id == postedParagraph.Id).FirstOrDefault();
            if (paragraphFound == null)
            {
                throw new Exception("Paragrahp not found!");
            }

            paragraphFound.Text = postedParagraph.Text;
            paragraphFound.ArticleId = postedParagraph.ArticleId;
            paragraphFound.Questions = postedParagraph.Questions;

            _context.SaveChanges();

            var responseData = _mapper.Map<CreateParagraphResponse>(paragraphFound);
            return responseData;
        }
        catch (Exception)
        {

            throw;
        }
    }

    // DELETE

    public void DeleteParagraph(int paragraphId)
    {
        try
        {
            var paragrapghFound = _context.Paragraph.Where(x => x.Id == paragraphId).FirstOrDefault();

            if (paragrapghFound == null)
            {
                throw new Exception("Paragrahp not found!");
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
