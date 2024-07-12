// CRUD controller for TransactionService
using Microsoft.AspNetCore.Mvc;

using backend.Models;
using backend.Services;
using backend.Exceptions;
namespace backend.Controllers;

class ApiResponse {
    public string? Message { get; set; }
    public int ErrorCode { get; set; } = 404;
    public bool ErrorStatus { get; set; } = true;
}

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
            ApiResponse failed = new ApiResponse();
            failed.Message = e.Message;
            return NotFound(failed);
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
            if (e.ErrorCode == 404) return NotFound();
            if (e.ErrorCode == 400) return BadRequest();
            if (e.ErrorCode == 500) return StatusCode(500);
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
            if (e.ErrorCode == 404) return NotFound();
            if (e.ErrorCode == 400) return BadRequest();
            if (e.ErrorCode == 500) return StatusCode(500);
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
            if (e.ErrorCode == 404) return NotFound();
            if (e.ErrorCode == 500) return StatusCode(500);
            return NotFound();
        }
    }
}