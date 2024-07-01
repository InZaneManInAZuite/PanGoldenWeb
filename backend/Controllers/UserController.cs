using Microsoft.AspNetCore.Mvc;

using backend.Models;
using backend.Services;
using backend.Exceptions;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly UserService _userService;

    public UserController(ILogger<UserController> logger, UserService userService)
    {
        _logger = logger;
        _userService = userService;
    }

    [HttpGet(Name = "GetAllUsers")]
    public async Task<IEnumerable<User>> GetAll()
    {
        return await _userService.GetAll();
    }

    [HttpGet("Username, {username}", Name = "GetUserByUsername")]
    public async Task<ActionResult<User>> GetByUsername(string username)
    {
        try
        { 
            return Ok(await _userService.GetByUsername(username));
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.message);
        }
    }

    [HttpGet("Id, {id}", Name = "GetUserById")]
    public async Task<ActionResult<User>> GetById(Guid id)
    {
        try
        {
            return Ok(await _userService.GetById(id));
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.message);
        }
    }

    [HttpGet("{username}, {password}", Name = "AuthenticateUser")]
    public async Task<ActionResult<User>> Authenticate(string username, string password)
    {
        try {
            User user = await _userService.Authenticate(username, password);
            return user;
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.message);
        }
    }

    [HttpPost(Name = "AddUser")]
    public async Task<IActionResult> Add(User user)
    {
        try
        {
            await _userService.Add(user);
            return CreatedAtRoute("GetUserByUsername", new { username = user.username }, user);
        }
        catch (PanGoldenException e)
        {
            if (e.errorCode == 400) return BadRequest(e.message);
            if (e.errorCode == 500) return StatusCode(500, e.message);
            return NotFound();
        }
    }

    [HttpPut(Name = "UpdateUser")]
    public async Task<ActionResult<User>> Update(User user)
    {
        try
        {
            return Ok(await _userService.Update(user));
        }
        catch (PanGoldenException e)
        {
            if (e.errorCode == 404) return NotFound(e.message);
            if (e.errorCode == 500) return StatusCode(500, e.message);
            return NotFound();
        }
    }

    [HttpDelete("{id}", Name = "DeleteUser")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _userService.Delete(id);
            return NoContent();
        }
        catch (PanGoldenException e)
        {
            if (e.errorCode == 404) return NotFound(e.message);
            if (e.errorCode == 500) return StatusCode(500, e.message);
            return NotFound();
        }
    }
}