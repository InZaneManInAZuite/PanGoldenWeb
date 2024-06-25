// Create transactions for a transaction system
namespace backend.Models;
public class Transaction
{
    public int id {get; set;}
    public required string description {get; set;}
    public required double amount {get; set;}
    public required DateTime date {get; set;}
    public required int userId {get; set;}
}