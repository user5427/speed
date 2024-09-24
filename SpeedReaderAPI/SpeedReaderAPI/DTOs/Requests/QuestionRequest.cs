namespace SpeedReaderAPI.DTOs.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Attributes;
using SpeedReaderAPI.Constants;

public class QuestionRequest : QuestionDTO
{
    public int ParagraphId { get; init; }
}
