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

    public async Task<Paragraph> CreateParagraphAsync(int articleId, ParagraphRequest request)
    {
        var article = await _context.Article.FindAsync(articleId)
                        ?? throw new Exception("Article not found!");
        var paragraph = new Paragraph
        {
            ArticleId = articleId,
            Text = request.Text
        };
        _context.Paragraph.Add(paragraph);
        await _context.SaveChangesAsync();

        return paragraph;
    }

    // READ

    // UPDATE

    public async Task<Paragraph> UpdateParagraphAsync(int paragraphId, ParagraphRequest request)
    {
        var paragraph = await _context.Paragraph.FindAsync(paragraphId)
                            ?? throw new Exception("Paragraph not found!");

        paragraph.Text = request.Text;

        await _context.SaveChangesAsync();
        return paragraph;
    }

    // DELETE

    public async Task DeleteParagraphAsync(int paragraphId)
    {
        var paragraph = await _context.Paragraph.FindAsync(paragraphId); ;
        if (paragraph == null) return;

        _context.Paragraph.Remove(paragraph);
        await _context.SaveChangesAsync();
    }
}
