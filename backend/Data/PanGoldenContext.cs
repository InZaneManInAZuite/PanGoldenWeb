using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;
public class PanGoldenContext : DbContext
{
    public PanGoldenContext(DbContextOptions<PanGoldenContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Account> Accounts => Set<Account>();
    public DbSet<Transaction> Transactions => Set<Transaction>();
}