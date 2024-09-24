
namespace SpeedReaderAPI.DTOs;

public class ParagraphDTO {
    public int Id { get; set; }
    public string Text { get; set; }
    public ICollection<QuestionDTO> Questions { get; set; }

}
