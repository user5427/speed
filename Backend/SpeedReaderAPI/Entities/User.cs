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
}

public enum Role {
    USER,
    ADMIN,
}
   
   
   