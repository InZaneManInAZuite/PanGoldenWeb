// All exceptions in the project should inherit from this class

using System;

public enum WarnName
{
    UserNotFound, AccountNotFound, TransactionNotFound,
    UserExists, AccountExists,
    LoginFailed

}

namespace backend.Exceptions
{
    public class PanGoldenException : Exception
    {
        public int errorCode { get; set; }
        public string message { get; set; }
        public bool status { get; } = false;

        public PanGoldenException(Exception e) {
            this.message = $"An error occurred: {e.Message}, Inner exception: {e.InnerException}";
            this.errorCode = 500;
        }
        public PanGoldenException(WarnName item){
            switch (item)
            {
                case WarnName.UserNotFound:
                    this.message = "User not found";
                    this.errorCode = 404;
                    break;
                case WarnName.AccountNotFound:
                    this.message = "Account not found";
                    this.errorCode = 404;
                    break;
                case WarnName.TransactionNotFound:
                    this.message = "Transaction not found";
                    this.errorCode = 404;
                    break;
                case WarnName.UserExists:
                    this.message = "User already exists";
                    this.errorCode = 400;
                    break;
                case WarnName.AccountExists:
                    this.message = "Account already exists";
                    this.errorCode = 400;
                    break;
                case WarnName.LoginFailed:
                    this.message = "Login failed";
                    this.errorCode = 401;
                    break;
                default:
                    this.message = "Item not found";
                    this.errorCode = 404;
                    break;
            }


        }
    }
}