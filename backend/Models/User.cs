// Create users for a login system
using Microsoft.AspNetCore.Identity;

namespace backend.Models;
public class User
{
    public int id {get; set;}
    public required string firstName {get; set;}
    public string? lastName {get; set;}
    public required string username {get; set;}
    public required string password {get; set;}

    public User copy(User user) {
        return new User {
            id = user.id,
            firstName = user.firstName,
            lastName = user.lastName,
            username = user.username,
            password = user.password
        };
    }
}
