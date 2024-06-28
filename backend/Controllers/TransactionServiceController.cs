// CRUD controller for TransactionService
using Microsoft.AspNetCore.Mvc;

using backend.Models;
using backend.Services;
using backend.Exceptions;
namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class TransactionServiceController : ControllerBase
{
    private readonly ILogger<TransactionServiceController> _logger;

    public TransactionServiceController(ILogger<TransactionServiceController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetAllTransactions")]
    public IEnumerable<Transaction> GetAll()
    {
        return TransactionService.GetAll();
    }

    [HttpGet("Account, {id}", Name = "GetTransactionsByAccount")]
    public IEnumerable<Transaction> GetByAccount(Guid id)
    {
        return TransactionService.GetAllByAccountId(id);
    }

    [HttpGet("Transaction, {id}", Name = "GetTransactionById")]
    public ActionResult<Transaction> GetById(Guid id)
    {
        try
        {
            return TransactionService.GetById(id);
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.message);
        }
    }

    [HttpPost(Name = "AddTransaction")]
    public IActionResult Add(Transaction transaction)
    {
        TransactionService.Add(transaction);
        return CreatedAtRoute("GetById", new { id = transaction.id }, transaction);
    }

    [HttpPut(Name = "UpdateTransaction")]
    public ActionResult<Transaction> Update(Transaction transaction)
    {
        try
        {
            return TransactionService.Update(transaction);
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.message);
        }
    }

    [HttpDelete("{id}", Name = "DeleteTransaction")]
    public IActionResult Delete(Guid id)
    {
        try
        {
            TransactionService.Delete(id);
            return NoContent();
        }
        catch (PanGoldenException e)
        {
            return NotFound(e.message);
        }
    }
}