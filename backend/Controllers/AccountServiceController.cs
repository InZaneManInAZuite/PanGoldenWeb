// CRUD controller for AccountService
using Microsoft.AspNetCore.Mvc;

using backend.Models;
using backend.Services;
using backend.Exceptions;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountServiceController : ControllerBase 
{
    private readonly ILogger<AccountServiceController> _logger;

    public AccountServiceController(ILogger<AccountServiceController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetAllAccounts")]
    public IEnumerable<Account> GetAll()
    {
        return AccountService.GetAll();
    }

    [HttpGet("User, {id}", Name = "GetAccountsByUser")]
    public IEnumerable<Account> GetByUser(Guid id)
    {
        return AccountService.GetAllByUserId(id);
    }

    [HttpGet("Account, {id}", Name = "GetAccountById")]
    public ActionResult<Account> GetById(Guid id)
    {
        try
        {
            return AccountService.GetById(id);
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.message);
        }
    }

    [HttpPost(Name = "AddAccount")]
    public ActionResult<Account> Add([FromBody] Account account)
    {
        try
        {
            AccountService.Add(account);
            return CreatedAtRoute("GetAccountById", new { id = account.id }, account);
        }
        catch (PanGoldenException e)
        {
            if (e.errorCode == 404) return NotFound(e.Message);
            if (e.errorCode == 400) return BadRequest(e.Message);
            return NotFound();
        }
    }

    [HttpPut(Name = "UpdateAccount")]
    public ActionResult<Account> Update([FromBody] Account account)
    {
        try
        {
            return AccountService.Update(account);
        }
        catch (PanGoldenException e)
        {
            if (e.errorCode == 404) return NotFound(e.Message);
            if (e.errorCode == 400) return BadRequest(e.Message);
            return NotFound();
        }
    }

    [HttpDelete("{id}", Name = "DeleteAccount")]
    public IActionResult Delete(Guid id)
    {
        try
        {
            AccountService.Delete(id);
            return NoContent();
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.Message);
        }
    }
}
