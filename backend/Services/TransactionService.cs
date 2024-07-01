// Create a service for transactions

using backend.Models;
using backend.Exceptions;
using backend.Data;
using Microsoft.EntityFrameworkCore;


namespace backend.Services
{
    // The service for transaction model
    public class TransactionService(PanGoldenContext context)
    {
        // Get all transactions
        public async Task<IEnumerable<Transaction>> GetAll() => await context.Transactions.ToListAsync();

        // Get all transactions by account id
        public async Task<IEnumerable<Transaction>> GetAllByAccountId(Guid accountId) 
            => await context.Transactions.Where(t => t.accountId == accountId).ToListAsync();

        // Get a transaction by id
        public async Task<Transaction> GetById(Guid id)
        {
            // Check if transaction exists
            var transaction = await context.Transactions.FirstOrDefaultAsync(t => t.id == id) 
                ?? throw new PanGoldenException(WarnName.TransactionNotFound);

            // Return transaction
            return transaction;
        }

        // Add a transaction
        public async Task Add(Transaction transaction)
        {
            // Check if account exists
            Account account = await context.Accounts.FirstAsync(a => a.id == transaction.accountId)
                ?? throw new PanGoldenException(WarnName.AccountNotFound);

            // Make sure account id and account matches
            if (account.id != transaction.accountId)
                throw new PanGoldenException(WarnName.AccountMismatch);

            // Generate transaction id
            transaction.id = Guid.NewGuid();

            // Add transaction to database
            try
            {
                context.Transactions.Add(transaction);
                await context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw new PanGoldenException(e);
            }
        }

        // Update a transaction
        public async Task<Transaction> Update(Transaction transaction)
        {
            // Check if transaction exists
            var oldTransaction = await context.Transactions.FirstOrDefaultAsync(t => t.id == transaction.id)
                ?? throw new PanGoldenException(WarnName.TransactionNotFound);

            // Update transaction
            oldTransaction.update(transaction);

            // Save changes
            try
            {
                context.Transactions.Update(oldTransaction);
                await context.SaveChangesAsync();
                return transaction;
            }
            catch (Exception e)
            {
                throw new PanGoldenException(e);
            }
        }

        // Delete a transaction
        public async Task Delete(Guid id)
        {
            // Check if transaction exists
            var transaction = await context.Transactions.FirstOrDefaultAsync(t => t.id == id)
                ?? throw new PanGoldenException(WarnName.TransactionNotFound);

            // Delete transaction
            try
            {
                context.Transactions.Remove(transaction);
                await context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw new PanGoldenException(e);
            }
        }
    }
}
