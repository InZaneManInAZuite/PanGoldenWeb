// Includes necessary libraries and the User model and exceptions
using backend.Models;
using backend.Exceptions;
namespace backend.Services;

// The service for user model
public static class UserService
{
    // A list of users
    static List<User> users { get; }
    static int nextId = 1;

    // Static constructor to initialize the list of users
    static UserService()
    {
        users = new List<User>();
    }

    // Get all users
    public static List<User> GetAll() => users;

    // Get a user by username
    public static User GetByUsername(string username)
    {
        var user = users.FirstOrDefault(u => u.username == username);
        if (user == null) throw new UserNotFoundException();
        return user;
    }

    // Get a user by id
    public static User GetById(int id) 
    {
        var user = users.FirstOrDefault(u => u.id == id);
        if (user == null) throw new UserNotFoundException();
        return user;
    }

    // Add a user
    public static void Add(User user)
    {
        if (users.Any(u => u.username == user.username)) throw new ExistingUserException();
        user.id = nextId++;
        users.Add(user);
    }

    // Update a user
    public static User Update(User user)
    {
        var index = users.FindIndex(u => u.id == user.id);
        if (index == -1) throw new UserNotFoundException();
        if (users.Any(u => u.username == user.username && u.id != user.id)) throw new ExistingUserException();
        users[index] = user;
        return user;
    }

    // Delete a user
    public static void Delete(int id)
    {
        var index = users.FindIndex(u => u.id == id);
        if (index == -1) return;
        users.RemoveAt(index);
    }

    // Delete all users
    public static void Clear() => users.Clear();

    // Authenticate a user
    public static User Authenticate(string username, string password)
    {
        var user = users.FirstOrDefault(u => u.username == username && u.password == password);
        if (user == null) throw new UserNotFoundException();
        return user;
    }
}
