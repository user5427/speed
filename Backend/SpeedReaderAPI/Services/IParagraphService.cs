namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs.Paragraph;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
using SpeedReaderAPI.Entities;

public interface IParagraphService
{
    ParagraphResponse CreateParagraph(ParagraphCreateRequest request);
    public ParagraphResponse GetParagraph(int id);
    ParagraphResponse UpdateParagraph(int id, ParagraphUpdateRequest request);
    void DeleteParagraph(int paragraphId);
}
