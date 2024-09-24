using SpeedReaderAPI.Entities;
using SpeedReaderAPI.Data;
using Microsoft.EntityFrameworkCore;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.DTOs.Responses;
namespace SpeedReaderAPI.Services;


public class ParagraphService : IParagraphService
{

    private readonly ApplicationContext _context;

    public ParagraphService(ApplicationContext context)
    {
        _context = context;
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