namespace SpeedReaderAPI.Entities;

public class ArticleSession
{
    [Key]
    public int Id { get; set; }

    [ForeignKey(nameof(User))]
    public int UserId { get; set}

    [ForeignKey(nameof(Article))]
    public int ArticleId { get; set}
    
    public DateTime Time { get; set; }
}