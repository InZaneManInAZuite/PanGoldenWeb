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

    [HttpGet("Username, {username}", Name = "GetUserByUsername")]
    public ActionResult<User> GetByUsername(string username)
    {
        try
        {
            return UserService.GetByUsername(username);
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.message);
        }
    }

    [HttpGet("Id, {id}", Name = "GetUserById")]
    public ActionResult<User> GetById(Guid id)
    {
        try
        {
            return UserService.GetById(id);
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.message);
        }
    }

    [HttpGet("{username}, {password}", Name = "AuthenticateUser")]
    public ActionResult<User> Authenticate(string username, string password)
    {
        try {
            User user = UserService.Authenticate(username, password);
            return user;
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.message);
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
        catch (PanGoldenException e)
        {
            return BadRequest(e.message);
        }
    }

    [HttpPut(Name = "UpdateUser")]
    public ActionResult<User> Update(User user)
    {
        try
        {
            return UserService.Update(user);
        }
        catch (PanGoldenException e)
        {
            if (e.errorCode == 404) return NotFound(e.message);
            if (e.errorCode == 400) return BadRequest(e.message);
            return NotFound();
        }
    }

    [HttpDelete("{id}", Name = "DeleteUser")]
    public IActionResult Delete(Guid id)
    {
        try
        {
            UserService.Delete(id);
            return NoContent();
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.message);
        }
    }
}