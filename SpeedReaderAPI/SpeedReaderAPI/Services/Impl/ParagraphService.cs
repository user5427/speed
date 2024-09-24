using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.Data;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.DTOs.Responses;
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

    public async Task<Object> CreateParagraphAsync(ParagraphRequest request)
    {
        try
        {
            var postedParagraph = _mapper.Map<Paragraph>(request);

            _context.Paragraph.Add(postedParagraph);
            await _context.SaveChangesAsync();

            var responseData = _mapper.Map<ParagraphResponse>(postedParagraph);
            return responseData;
        }
        catch (Exception)
        {

            throw;
        }
    }

    // READ

    // UPDATE

    public async Task<Object> UpdateParagraphAsync(ParagraphRequest request)
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

            await _context.SaveChangesAsync();

            var responseData = _mapper.Map<ParagraphResponse>(paragraphFound);
            return responseData;
        }
        catch (Exception)
        {

            throw;
        }
    }

    // DELETE

    public async Task DeleteParagraphAsync(int paragraphId)
    {
        try
        {
            var paragrapghFound = _context.Paragraph.Where(x => x.Id == paragraphId).FirstOrDefault();

            if (paragrapghFound == null)
            {
                throw new Exception("Paragrahp not found!");
            }

            _context.Paragraph.Remove(paragrapghFound);
            await _context.SaveChangesAsync();
        }
        catch (Exception)
        {

            throw;
        }
    }
}
