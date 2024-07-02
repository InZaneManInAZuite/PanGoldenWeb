// Account for the user
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

[PrimaryKey(nameof(id))]
public class Account
{
    public Guid id { get; set; }
    public string? name { get; set; }

    public double? untrackedBalance { get; set; } = 0;

    public Guid? userId { get; set; }
    public User? user { get; set; }

    public Account() {}

    private Account(Guid id, string? name, double? untrackedBalance, Guid? userId, User? user)
    {
        this.id = id;
        this.name = name;
        this.untrackedBalance = untrackedBalance;
        this.userId = userId;
        this.user = user;
    }

    public Account copy() 
    {
        return new Account(id, name, untrackedBalance, userId, user);
    }

    public void update(Account account)
    {
        if (account.name != null) name = account.name;
        if (account.untrackedBalance != null) untrackedBalance = account.untrackedBalance;
    }
}
