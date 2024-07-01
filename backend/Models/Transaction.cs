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
    public Guid id { get; set; }

    public TransactionType type { get; set; }
    public string description { get; set; }
    public double amount { get; set; }
    public DateTime date { get; set; }
    public Guid accountId { get; set; }
    public Account account { get; set; }

    public Transaction() { }

    private Transaction(Guid id, TransactionType type, string description, double amount, DateTime date, Guid accountId)
    {
        this.id = id;
        this.type = type;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.accountId = accountId;
    }

    public Transaction copy()
    {
        return new Transaction(id, type, description, amount, date, accountId);
    }

    public void update(Transaction transaction)
    {
        this.type = transaction.type;
        this.description = transaction.description;
        this.amount = transaction.amount;
        this.date = transaction.date;
    }
}