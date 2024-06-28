// Create users for a login system
using System.Data.SqlTypes;

namespace backend.Models;
public class User
{
    public Guid id {get; set;}
    public required string firstName {get; set;}
    public string? lastName {get; set;}
    public required string username {get; set;}
    public required string password {get; set;}
    
    public User copy()
    {
        return new User
        {
            id = this.id,
            firstName = this.firstName,
            lastName = this.lastName,
            username = this.username,
            password = this.password
        };
    }
}
