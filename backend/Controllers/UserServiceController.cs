using Microsoft.AspNetCore.Mvc;

using backend.Models;
using backend.Services;
using backend.Exceptions;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserServiceController : ControllerBase
{
    private readonly ILogger<UserServiceController> _logger;

    public UserServiceController(ILogger<UserServiceController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetAllUsers")]
    public IEnumerable<User> GetAll()
    {
        return UserService.GetAll();
    }

    [HttpGet("{username}", Name = "GetUserByUsername")]
    public ActionResult<User> GetByUsername(string username)
    {
        try
        {
            return UserService.GetByUsername(username);
        }
        catch (UserNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpGet("{username}, {password}", Name = "AuthenticateUser")]
    public ActionResult<User> Authenticate(string username, string password)
    {
        try {
            User user = UserService.Authenticate(username, password);
            return user;
        }
        catch (UserLogInFailedException)
        {
            return NotFound();
        }
    }

    [HttpPost(Name = "AddUser")]
    public IActionResult Add(User user)
    {
        try
        {
            UserService.Add(user);
            return CreatedAtRoute("GetUserByUsername", new { username = user.username }, user);
        }
        catch (ExistingUserException)
        {
            return BadRequest();
        }
    }

    [HttpPut(Name = "UpdateUser")]
    public ActionResult<User> Update(User user)
    {
        try
        {
            return UserService.Update(user);
        }
        catch (UserNotFoundException)
        {
            return NotFound();
        }
        catch (ExistingUserException)
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}", Name = "DeleteUser")]
    public IActionResult Delete(int id)
    {
        try
        {
            UserService.Delete(id);
            return NoContent();
        }
        catch (UserNotFoundException)
        {
            return NotFound();
        }
    }
}