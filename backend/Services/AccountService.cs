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
    public async Task<IEnumerable<Account>> GetAll() => await context.Accounts.Include(a => a.user).ToListAsync();

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
        account.user = await context.Users.FirstAsync(u => u.id == account.userId)
            ?? throw new PanGoldenException(WarnName.UserNotFound);

        // Check if account name exists
        if (await context.Accounts.AnyAsync(a => a.name == account.name && a.userId == account.userId))
            throw new PanGoldenException(WarnName.AccountExists);

        // Generate account id
        account.id = Guid.NewGuid();

        // Set default values
        if (account.untrackedBalance == null) account.untrackedBalance = 0;

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
        var accountFound = await context.Accounts.FirstOrDefaultAsync(a => a.id == account.id)
            ?? throw new PanGoldenException(WarnName.AccountNotFound);

        // Check if account name exists
        if (await context.Accounts.AnyAsync(a => a.name == account.name && a.id != account.id && a.userId == account.userId))
            throw new PanGoldenException(WarnName.AccountExists);

        // Update account
        accountFound.update(account);

        // Update account in database
        try
        {
            context.Accounts.Update(accountFound);
            await context.SaveChangesAsync();
            return accountFound;
        }
        catch (Exception e)
        {
            throw new PanGoldenException(e);
        }
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
