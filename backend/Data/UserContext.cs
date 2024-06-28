using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;
class UserContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Account> Accounts => Set<Account>();
    public DbSet<Transaction> Transactions => Set<Transaction>();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=PanGoldenWeb;Trusted_Connection=True;");
    }
}