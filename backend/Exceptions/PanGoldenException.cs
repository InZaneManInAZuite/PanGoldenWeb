// All exceptions in the project should inherit from this class

using System;

public enum ExceptionName
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
        public PanGoldenException(ExceptionName item) {
            switch (item)
            {
                case ExceptionName.UserNotFound:
                    this.message = "User not found";
                    this.errorCode = 404;
                    break;
                case ExceptionName.AccountNotFound:
                    this.message = "Account not found";
                    this.errorCode = 404;
                    break;
                case ExceptionName.TransactionNotFound:
                    this.message = "Transaction not found";
                    this.errorCode = 404;
                    break;
                case ExceptionName.UserExists:
                    this.message = "User already exists";
                    this.errorCode = 400;
                    break;
                case ExceptionName.AccountExists:
                    this.message = "Account already exists";
                    this.errorCode = 400;
                    break;
                case ExceptionName.LoginFailed:
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