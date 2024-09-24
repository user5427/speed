namespace SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.DTOs.Responses;
using SpeedReaderAPI.Entities;

public interface IParagraphService
{
    // CREATE
    Task<Paragraph> CreateParagraphAsync(int articleId, ParagraphRequest request);


    // READ
    // Task<ParagraphResponse> GetParagraph(int id);

    // UPDATE
    Task<Paragraph> UpdateParagraphAsync(int paragraphId, ParagraphRequest request);


    // DELETE
    Task DeleteParagraphAsync(int paragraphId);
}
