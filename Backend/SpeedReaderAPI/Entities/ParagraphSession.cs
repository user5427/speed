namespace SpeedReaderAPI.Entities;

public class ParagraphSession
{
    [Key]
    public int Id { get; set; }
    
    [ForeignKey(nameof(ArticleSession))]
    public int ArticleSessionId { get; set; }

    [ForeignKey(nameof(Paragraph))]
    public int ParagraphId { get; set; }

    public int Duration { get; set; } // Seconds

    public int Wpm { get; set; } 

    public int CorrectQuestionCount { get; set; }
    
    public int TotalQuestionCount { get; set; }
}