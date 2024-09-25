namespace SpeedReaderAPI.Services;

using SpeedReaderAPI.DTOs.Paragraph;
using SpeedReaderAPI.DTOs.Paragraph.Requests;
using SpeedReaderAPI.DTOs.Paragraph.Responses;
using SpeedReaderAPI.Entities;

public interface IParagraphService
{
    Object CreateParagraph(ParagraphRequest request);


    public ParagraphDTO GetParagraph(int id);

    Object UpdateParagraph(ParagraphRequest request);

    void DeleteParagraph(int paragraphId);
}
