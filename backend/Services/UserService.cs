// Includes necessary libraries and the User model and exceptions
using backend.Models;
using backend.Exceptions;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

// The service for user model
public class UserService(PanGoldenContext context)
{
    // Get all users
    public async Task<IEnumerable<User>> GetAll() => await context.Users.ToListAsync();

    // Get a user by username
    public async Task<User> GetByUsername(string username)
    {
        // Check if user exists
        var user = await context.Users.FirstOrDefaultAsync(u => u.username == username) 
            ?? throw new PanGoldenException(WarnName.UserNotFound);

        // Return user
        return user;
    }

    // Get a user by id
    public async Task<User> GetById(Guid id)
    {
        // Check if user exists
        var user = await context.Users.FirstOrDefaultAsync(u => u.id == id)
            ?? throw new PanGoldenException(WarnName.UserNotFound);

        // Return user
        return user;
    }

    // Add a user
    public async Task Add(User user)
    {
        // Check if username exists
        if (await context.Users.AnyAsync(u => u.username == user.username)) 
            throw new PanGoldenException(WarnName.UserExists);

        // Generate user id
        user.id = Guid.NewGuid();

        // Add user to database
        try {
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw new PanGoldenException(e);
        }
    }

    // Update a user
    public async Task<User> Update(User user)
    {
        // Check if user exists
        var userFound = await context.Users.FirstOrDefaultAsync(u => u.id == user.id)
            ?? throw new PanGoldenException(WarnName.UserNotFound);

        // Check if username exists
        if (await context.Users.AnyAsync(u => u.username == user.username && u.id != user.id)) 
            throw new PanGoldenException(WarnName.UserExists);

        
        // Transfer user data
        userFound.update(user);
        
        // Update user
        try {
            context.Users.Update(userFound);
            await context.SaveChangesAsync();
            return userFound;
        }
        catch (Exception e)
        {
            throw new PanGoldenException(e);
        }
    }

    // Delete a user
    public async Task Delete(Guid id)
    {
        // Check if user exists
        var user = await context.Users.FirstOrDefaultAsync(u => u.id == id) 
            ?? throw new PanGoldenException(WarnName.UserNotFound);

        // Delete user
        try {
            context.Users.Remove(user);
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw new PanGoldenException(e); 
        }
    }

    // Delete all users
    public async Task Clear()
    {
        try {
            context.Users.RemoveRange(context.Users);
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw new PanGoldenException(e);
        }
    }

    // Authenticate a user
    public async Task<User> Authenticate(string username, string password)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.username == username && u.password == password);
        if (user == null) throw new PanGoldenException(WarnName.LoginFailed);
        return user;
    }
}
