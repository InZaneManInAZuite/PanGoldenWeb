// Create users for a login system
using Microsoft.AspNetCore.Identity;

namespace backend.Models;
public class User
{
    public int Id {get; set;}
    public required string FirstName {get; set;}
    public string? LastName {get; set;}
    public required string Username {get; set;}
    public required string Password {get; set;}
}
