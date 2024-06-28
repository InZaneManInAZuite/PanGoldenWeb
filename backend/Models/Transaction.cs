// Create transactions for a transaction system
namespace backend.Models;

enum TransactionType
{
    Gain, Lose, Transfer
}

public class Transaction
{
    public Guid id {get; set;}

    public required string type {get; set;}
    public required string description {get; set;}
    public required double amount {get; set;}
    public required DateTime date {get; set;}
    public required Guid accountId {get; set;}
}