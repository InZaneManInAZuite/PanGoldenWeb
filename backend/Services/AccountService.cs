// Service for account operations

using backend.Models;
using backend.Exceptions;

namespace backend.Services
{
    // The service for account model
    public class AccountService
    {
        // A list of accounts
        static List<Account> accounts { get; }

        // Static constructor to initialize the list of accounts
        static AccountService()
        {
            accounts = new List<Account>();
        }

        // Get all accounts
        public static List<Account> GetAll() => accounts;

        // Get all accounts by user id
        public static List<Account> GetAllByUserId(Guid userId)
        {
            return accounts.Where(a => a.userId == userId).ToList();
        }

        // Get an account by id
        public static Account GetById(Guid id)
        {
            var account = accounts.FirstOrDefault(a => a.id == id);
            if (account == null) throw new PanGoldenException(ExceptionName.AccountNotFound);
            return account;
        }

        // Add an account
        public static void Add(Account account)
        {
            account.id = Guid.NewGuid();
            accounts.Add(account);
        }

        // Update an account
        public static Account Update(Account account)
        {
            var index = accounts.FindIndex(a => a.id == account.id);
            if (index == -1) throw new PanGoldenException(ExceptionName.AccountNotFound);
            accounts[index] = account;
            return account;
        }

        // Delete an account
        public static void Delete(Guid id)
        {
            var index = accounts.FindIndex(a => a.id == id);
            if (index == -1) throw new PanGoldenException(ExceptionName.AccountNotFound);
            accounts.RemoveAt(index);
        }
    }
}