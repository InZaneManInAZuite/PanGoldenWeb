// Account for the user
namespace backend.Models
{
    public class Account
    {
        public Guid id { get; set; }
        public required string name { get; set; }

        public required double untrackedBalance { get; set; }

        public required Guid userId { get; set; }

        public Account(){}

        public Account(string name, Guid userId)
        {
            this.name = name;
            this.untrackedBalance = 0;
            this.userId = userId;
        }

        public Account(string name, double balance, Guid userId)
        {
            this.name = name;
            this.untrackedBalance = balance;
            this.userId = userId;
        }
    }
}