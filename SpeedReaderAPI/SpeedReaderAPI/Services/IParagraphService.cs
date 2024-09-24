namespace SpeedReaderAPI.Services;
using SpeedReaderAPI.Entities;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.DTOs.Responses;

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