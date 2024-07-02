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

    public TransactionType? type { get; set; }
    public string? description { get; set; }
    public double? amount { get; set; }
    public DateTime? date { get; set; }
    public Guid? accountId { get; set; }
    public Account? account { get; set; }

    public Transaction() { }

    private Transaction(Guid id, TransactionType? type, string? description, double? amount, DateTime? date, Guid? accountId, Account? account)
    {
        this.id = id;
        this.type = type;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.accountId = accountId;
        this.account = account;
    }

    public Transaction copy()
    {
        return new Transaction(id, type, description, amount, date, accountId, account);
    }

    public void update(Transaction transaction)
    {
        if (transaction.type != null) type = transaction.type;
        if (transaction.description != null) description = transaction.description;
        if (transaction.amount != null) amount = transaction.amount;
        if (transaction.date != null) date = transaction.date;
    }
}