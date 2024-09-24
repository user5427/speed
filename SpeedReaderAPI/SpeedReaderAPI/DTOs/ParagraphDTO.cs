
namespace SpeedReaderAPI.DTOs;

public record ParagraphDTO(int Id, string Text, ICollection<QuestionDTO> Questions);