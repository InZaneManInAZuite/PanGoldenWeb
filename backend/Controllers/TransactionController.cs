// CRUD controller for TransactionService
using Microsoft.AspNetCore.Mvc;

using backend.Models;
using backend.Services;
using backend.Exceptions;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")] 
public class TransactionController : ControllerBase
{
    private readonly ILogger<TransactionController> _logger;
    private readonly TransactionService _transactionService;

    public TransactionController(ILogger<TransactionController> logger, 
                                    TransactionService transactionService)
    {
        _logger = logger;
        _transactionService = transactionService;
    }

    [HttpGet(Name = "GetAllTransactions")]
    public async Task<IEnumerable<Transaction>> GetAll()
    {
        return await _transactionService.GetAll();
    }

    [HttpGet("Account,{id}", Name = "GetTransactionsByAccount")]
    public async Task<IEnumerable<Transaction>> GetByAccount(Guid id)
    {
        return await _transactionService.GetAllByAccountId(id);
    }

    [HttpGet("Transaction,{id}", Name = "GetTransactionById")]
    public async Task<ActionResult<Transaction>> GetById(Guid id)
    {
        try
        {
            return Ok(await _transactionService.GetById(id));
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.Message);
        }
    }

    [HttpPost(Name = "AddTransaction")]
    public async Task<IActionResult> Add([FromBody] Transaction transaction)
    {
        try
        {
            await _transactionService.Add(transaction);
            return CreatedAtRoute("GetTransactionById", new { id = transaction.id }, transaction);
        }
        catch (PanGoldenException e)
        {
            if (e.errorCode == 404) return NotFound(e.Message);
            if (e.errorCode == 400) return BadRequest(e.Message);
            if (e.errorCode == 500) return StatusCode(500, e.Message);
            return NotFound();
        }
    }

    [HttpPut(Name = "UpdateTransaction")]
    public async Task<ActionResult<Transaction>> Update(Transaction transaction)
    {
        try
        {
            return await _transactionService.Update(transaction);
        }
        catch (PanGoldenException e)
        {
            if (e.errorCode == 404) return NotFound(e.Message);
            if (e.errorCode == 400) return BadRequest(e.Message);
            if (e.errorCode == 500) return StatusCode(500, e.Message);
            return NotFound();
        }
    }

    [HttpDelete("{id}", Name = "DeleteTransaction")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _transactionService.Delete(id);
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