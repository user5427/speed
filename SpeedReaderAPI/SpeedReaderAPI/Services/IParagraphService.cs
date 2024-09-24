namespace SpeedReaderAPI.Services;
using SpeedReaderAPI.DTOs.Requests;
using SpeedReaderAPI.DTOs.Responses;
using SpeedReaderAPI.Entities;

public interface IParagraphService
{
    // CREATE
    Task<Object> CreateParagraphAsync(ParagraphRequest request);


    // READ
    // Task<ParagraphResponse> GetParagraph(int id);

    // UPDATE
    Task<Object> UpdateParagraphAsync(ParagraphRequest request);


    // DELETE
    Task DeleteParagraphAsync(int paragraphId);
}
