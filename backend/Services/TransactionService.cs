// Create a service for transactions

using backend.Models;
using backend.Exceptions;

namespace backend.Services
{
    // The service for transaction model
    public class TransactionService
    {
        // A list of transactions
        static List<Transaction> transactions { get; }

        // Static constructor to initialize the list of transactions
        static TransactionService()
        {
            transactions = new List<Transaction>();
        }

        // Get all transactions
        public static List<Transaction> GetAll() => transactions;

        // Get all transactions by account id
        public static List<Transaction> GetAllByAccountId(Guid accountId)
        {
            return transactions.FindAll(t => t.accountId == accountId).ToList();
        }

        // Get a transaction by id
        public static Transaction GetById(Guid id)
        {
            Transaction transaction = transactions.FirstOrDefault(t => t.id == id) ?? throw new PanGoldenException(WarnName.TransactionNotFound);
            return transaction;
        }

        // Add a transaction
        public static void Add(Transaction transaction)
        {
            transaction.id = Guid.NewGuid();
            transactions.Add(transaction);
        }

        // Update a transaction
        public static Transaction Update(Transaction transaction)
        {
            int index = transactions.FindIndex(t => t.id == transaction.id);
            if (index == -1) throw new PanGoldenException(WarnName.TransactionNotFound);
            transactions[index] = transaction;
            return transaction;
        }

        // Delete a transaction
        public static void Delete(Guid id)
        {
            int index = transactions.FindIndex(t => t.id == id);
            if (index == -1) throw new PanGoldenException(WarnName.TransactionNotFound);
            transactions.RemoveAt(index);
        }
    }
}
