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

        // Get a transaction by id
        public static Transaction GetById(Guid id)
        {
            var transaction = transactions.FirstOrDefault(t => t.id == id);
            if (transaction == null) throw new PanGoldenException(ExceptionName.TransactionNotFound);
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
            var index = transactions.FindIndex(t => t.id == transaction.id);
            if (index == -1) throw new PanGoldenException(ExceptionName.TransactionNotFound);
            transactions[index] = transaction;
            return transaction;
        }

        // Delete a transaction
        public static void Delete(Guid id)
        {
            var index = transactions.FindIndex(t => t.id == id);
            if (index == -1) throw new PanGoldenException(ExceptionName.TransactionNotFound);
            transactions.RemoveAt(index);
        }
    }
}
