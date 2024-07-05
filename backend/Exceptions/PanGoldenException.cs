// All exceptions in the project should inherit from this class

using System;

public enum WarnName
{
    UserNotFound, AccountNotFound, TransactionNotFound,
    UserExists, AccountExists,
    LoginFailed,
    UserMismatch, AccountMismatch

}

namespace backend.Exceptions
{
    public class PanGoldenException : Exception
    {
        public int ErrorCode { get; set; }
        
        public new string Message { get; set; }
        public bool Status { get; } = false;

        public PanGoldenException(Exception e) {
            this.Message = $"An error occurred: {e.Message}, Inner exception: {e.InnerException}";
            this.ErrorCode = 500;
        }
        public PanGoldenException(WarnName item){
            switch (item)
            {
                case WarnName.UserNotFound:
                    this.Message = "User not found";
                    this.ErrorCode = 404;
                    break;
                case WarnName.AccountNotFound:
                    this.Message = "Account not found";
                    this.ErrorCode = 404;
                    break;
                case WarnName.TransactionNotFound:
                    this.Message = "Transaction not found";
                    this.ErrorCode = 404;
                    break;
                case WarnName.UserExists:
                    this.Message = "User already exists";
                    this.ErrorCode = 400;
                    break;
                case WarnName.AccountExists:
                    this.Message = "Account already exists";
                    this.ErrorCode = 400;
                    break;
                case WarnName.LoginFailed:
                    this.Message = "Login failed";
                    this.ErrorCode = 401;
                    break;
                case WarnName.UserMismatch:
                    this.Message = "User mismatch";
                    this.ErrorCode = 400;
                    break;
                case WarnName.AccountMismatch:
                    this.Message = "Account mismatch";
                    this.ErrorCode = 400;
                    break;
                default:
                    this.Message = "Item not found";
                    this.ErrorCode = 404;
                    break;
            }


        }
    }
}