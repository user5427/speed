using System.ComponentModel.DataAnnotations;

namespace SpeedReaderAPI.Entities;

public class User
{
    [Key]
    public long Id { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required Role Role { get; set; }

    public long WordsRead { get; set; } = 0;
    public long SecondsRead { get; set; } = 0;
    public long CorrectQuestions { get; set; } = 0;
    public long TotalQuestions { get; set; } = 0;
    public long ArticlesCountRead { get; set; } = 0;
}

public enum Role
{
    USER,
    ADMIN,
}


