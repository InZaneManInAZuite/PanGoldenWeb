// Create transactions for a transaction system
using Microsoft.EntityFrameworkCore;
namespace backend.Models;

public enum TransactionType
{
    Gain, Lose, Transfer
}

[PrimaryKey(nameof(id))]
public class Transaction
{
    public Guid id {get; set;}

    public required TransactionType type {get; set;}
    public required string description {get; set;}
    public required double amount {get; set;}
    public required DateTime date {get; set;}
    public required Guid accountId {get; set;}
}