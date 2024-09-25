namespace SpeedReaderAPI.DTOs.Question.Requests;
using System.ComponentModel.DataAnnotations;
using SpeedReaderAPI.Attributes;
using SpeedReaderAPI.Constants;
using SpeedReaderAPI.DTOs.Question;

public class QuestionRequest : QuestionDTO
{
    public int ParagraphId { get; init; }
}
