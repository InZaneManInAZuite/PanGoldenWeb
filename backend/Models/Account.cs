// Account for the user
namespace backend.Models
{
    public class Account
    {
        public Guid id { get; set; }
        public required string name { get; set; }

        public required double untrackedBalance { get; set; }

        public List<Transaction> transactions { get; set; }

        public required Guid userId { get; set; }

        public Account(string name)
        {
            transactions = new List<Transaction>();
            this.name = name;
            this.untrackedBalance = 0;
        }

        public Account(string name, double balance)
        {
            transactions = new List<Transaction>();
            this.name = name;
            this.untrackedBalance = balance;
        }
    }
}