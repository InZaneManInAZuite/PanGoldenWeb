// Create users for a login system
using Microsoft.EntityFrameworkCore;

namespace backend.Models;
[PrimaryKey(nameof(id))]
public class User
{
    public Guid id { get; set; }
    public string? firstName { get; set; }
    public string? lastName { get; set; }
    public string? username { get; set; }
    public string? password { get; set; }

    public User() { }

    private User(Guid id, string? firstName, string? lastName, string? username, string? password)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }

    public User copy()
    {
        return new User(id, firstName, lastName, username, password);
    }

    public void update(User user)
    {
        if (user.firstName != null) firstName = user.firstName;
        if (user.lastName != null) lastName = user.lastName;
        if (user.username != null) username = user.username;
        if (user.password != null) password = user.password;
    }
}
