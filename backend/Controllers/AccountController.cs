// CRUD controller for AccountService
using Microsoft.AspNetCore.Mvc;

using backend.Models;
using backend.Services;
using backend.Exceptions;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase 
{
    private readonly ILogger<AccountController> _logger;
    private readonly AccountService _accountService;

    public AccountController(ILogger<AccountController> logger, AccountService accountService)
    {
        _logger = logger;
        _accountService = accountService;
    }

    [HttpGet(Name = "GetAllAccounts")]
    public async Task<IEnumerable<Account>> GetAll()
    {
        return await _accountService.GetAll();
    }

    [HttpGet("User, {id}", Name = "GetAccountsByUser")]
    public async Task<IEnumerable<Account>> GetByUser(Guid id)
    {
        return await _accountService.GetAllByUserId(id);
    }

    [HttpGet("Account, {id}", Name = "GetAccountById")]
    public async Task<ActionResult<Account>> GetById(Guid id)
    {
        try
        {
            return Ok(await _accountService.GetById(id));
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.Message);
        }
    }

    [HttpPost(Name = "AddAccount")]
    public async Task<IActionResult> Add([FromBody] Account account)
    {
        try
        {
            await _accountService.Add(account);
            return CreatedAtRoute("GetAccountById", new { id = account.id }, account);
        }
        catch (PanGoldenException e)
        {
            if (e.errorCode == 404) return NotFound(e.Message);
            if (e.errorCode == 400) return BadRequest(e.Message);
            if (e.errorCode == 500) return StatusCode(500, e.Message);
            return NotFound();
        }
    }
    

    [HttpPut(Name = "UpdateAccount")]
    public async Task<ActionResult<Account>> Update([FromBody] Account account)
    {
        try
        {
            return await _accountService.Update(account);
        }
        catch (PanGoldenException e)
        {
            if (e.errorCode == 404) return NotFound(e.Message);
            if (e.errorCode == 400) return BadRequest(e.Message);
            if (e.errorCode == 500) return StatusCode(500, e.Message);
            return NotFound();
        }
    }

    [HttpDelete("{id}", Name = "DeleteAccount")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _accountService.Delete(id);
            return NoContent();
        }
        catch (PanGoldenException e)
        {
            if (e.errorCode == 404) return NotFound(e.Message);
            if (e.errorCode == 500) return StatusCode(500, e.Message);
            return NotFound();
        }
    }
}
