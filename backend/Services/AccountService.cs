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
            Account account = accounts.FirstOrDefault(a => a.id == id) 
                ?? throw new PanGoldenException(WarnName.AccountNotFound);
            return account;
        }

        // Add an account
        public static void Add(Account account)
        {
            List<Account> userAccounts = GetAllByUserId(account.userId);
            if (userAccounts.Any(a => a.name == account.name)) 
                throw new PanGoldenException(WarnName.AccountExists);
            account.id = Guid.NewGuid();
            accounts.Add(account);
        }

        // Update an account
        public static Account Update(Account account)
        {
            List<Account> userAccounts = GetAllByUserId(account.userId);
            int index = userAccounts.FindIndex(a => a.id == account.id);
            if (index == -1) throw new PanGoldenException(WarnName.AccountNotFound);
            if (userAccounts.Any(a => a.name == account.name && a.id != account.id)) 
                throw new PanGoldenException(WarnName.AccountExists);
            userAccounts[index] = account;
            return account;
        }

        // Delete an account
        public static void Delete(Guid id)
        {
            var index = accounts.FindIndex(a => a.id == id);
            if (index == -1) throw new PanGoldenException(WarnName.AccountNotFound);
            accounts.RemoveAt(index);
        }
    }
}