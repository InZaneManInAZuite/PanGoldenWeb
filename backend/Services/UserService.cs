// Includes necessary libraries and the User model and exceptions
using backend.Models;
using backend.Exceptions;
namespace backend.Services;

// The service for user model
public static class UserService
{
    // A list of users
    static List<User> Users { get; }
    static int nextId = 1;

    // Static constructor to initialize the list of users
    static UserService()
    {
        Users = new List<User>();
    }

    // Get all users
    public static List<User> GetAll() => Users;

    // Get a user by username
    public static User GetByUsername(string username)
    {
        var user = Users.FirstOrDefault(u => u.Username == username);
        if (user == null) throw new UserNotFoundException();
        return user;
    }

    // Get a user by id
    public static User GetById(int id) 
    {
        var user = Users.FirstOrDefault(u => u.Id == id);
        if (user == null) throw new UserNotFoundException();
        return user;
    }

    // Add a user
    public static void Add(User user)
    {
        if (Users.Any(u => u.Username == user.Username)) throw new ExistingUserException();
        user.Id = nextId++;
        Users.Add(user);
    }

    // Update a user
    public static void Update(User user)
    {
        var index = Users.FindIndex(u => u.Id == user.Id);
        if (index == -1) return;
        if (Users.Any(u => u.Username == user.Username && u.Id != user.Id)) throw new ExistingUserException();
        Users[index] = user;
    }

    // Delete a user
    public static void Delete(int id)
    {
        var index = Users.FindIndex(u => u.Id == id);
        if (index == -1) return;
        Users.RemoveAt(index);
    }

    // Delete all users
    public static void Clear() => Users.Clear();

    // Authenticate a user
    public static User Authenticate(string username, string password)
    {
        var user = Users.FirstOrDefault(u => u.Username == username && u.Password == password);
        if (user == null) throw new UserNotFoundException();
        return user;
    }
}
