using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpeedReaderAPI.Entities;

public class ArticleSession
{
    [Key]
    public long Id { get; set; }

    [ForeignKey(nameof(User))]
    public long UserId { get; set; }

    [ForeignKey(nameof(Article))]
    public int ArticleId { get; set; }
    
    public DateTime Time { get; set; }

    public required User User { get; set; }
    public required Article Article { get; set; }
}