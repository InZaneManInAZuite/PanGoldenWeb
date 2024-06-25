using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;
class UserContext : DbContext
{
    public UserContext(DbContextOptions<UserContext> options) : base(options) { }
    public DbSet<User> Users => Set<User>();
}