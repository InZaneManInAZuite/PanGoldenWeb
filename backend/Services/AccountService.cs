// Service for account operations

using backend.Models;
using backend.Exceptions;
using backend.Data;
using Microsoft.EntityFrameworkCore;


namespace backend.Services;

// The service for account model
public class AccountService(PanGoldenContext context)
{

    // Get all accounts
    public async Task<IEnumerable<Account>> GetAll() => await context.Accounts.ToListAsync();

    // Get all accounts by user id
    public async Task<IEnumerable<Account>> GetAllByUserId(Guid userId) 
        => await context.Accounts.Where(a => a.userId == userId).ToListAsync();

    // Get an account by id
    public async Task<Account> GetById(Guid id)
    {
        // Check if account exists
        var account = await context.Accounts.FirstOrDefaultAsync(a => a.id == id) 
            ?? throw new PanGoldenException(WarnName.AccountNotFound);

        // Return account
        return account;
    }

    // Add an account
    public async Task Add(Account account)
    {
        // Check if user exists
        User user = await context.Users.FirstAsync(u => u.id == account.userId)
            ?? throw new PanGoldenException(WarnName.UserNotFound);

        // Make sure userid matches the account userid
        if (user.id != account.userId)
            throw new PanGoldenException(WarnName.UserMismatch);

        // Check if account name exists
        IEnumerable<Account> userAccounts = await GetAllByUserId(account.userId);
        if (userAccounts.Any(a => a.name == account.name))
            throw new PanGoldenException(WarnName.AccountExists);

        // Generate account id
        account.id = Guid.NewGuid();

        // Add account to database
        try
        {
            context.Accounts.Add(account);
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw new PanGoldenException(e);
        }
    }

    // Update an account
    public async Task<Account> Update(Account account)
    {
        // Check if account exists
        IEnumerable<Account> userAccounts = await GetAllByUserId(account.userId);
        if (!userAccounts.Any(a => a.id == account.id))
            throw new PanGoldenException(WarnName.AccountNotFound);

        // Check if account name exists
        if (userAccounts.Any(a => a.name == account.name && a.id != account.id))
            throw new PanGoldenException(WarnName.AccountExists);

        // Update account in database
        try
        {
            context.Accounts.Update(account);
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw new PanGoldenException(e);
        }

        // Return account
        return account;
    }

    // Delete an account
    public async Task Delete(Guid id)
    {
        // Check if account exists
        var account = await context.Accounts.FirstOrDefaultAsync(a => a.id == id) 
            ?? throw new PanGoldenException(WarnName.AccountNotFound);

        // Delete account from database
        try
        {
            context.Accounts.Remove(account);
            await context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            throw new PanGoldenException(e);
        }
    }
}
