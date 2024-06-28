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

    [HttpGet("{id}", Name = "GetTransactionById")]
    public ActionResult<Transaction> GetById(int id)
    {
        try
        {
            return TransactionService.GetById(id);
        }
        catch (TransactionNotFoundException)
        {
            return NotFound();
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
        catch (TransactionNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}", Name = "DeleteTransaction")]
    public IActionResult Delete(int id)
    {
        try
        {
            TransactionService.Delete(id);
            return NoContent();
        }
        catch (TransactionNotFoundException)
        {
            return NotFound();
        }
    }
}