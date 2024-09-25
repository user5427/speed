namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.Entities;

public interface IParagraphService
{
    // CREATE
    Object CreateParagraph(ParagraphRequest request);


    // READ
    // Task<ParagraphResponse> GetParagraph(int id);

    // UPDATE
    Object UpdateParagraph(ParagraphRequest request);


    // DELETE
    void DeleteParagraph(int paragraphId);
}
