// Exception class when user and password failed to authenticate

namespace backend.Exceptions;
public class UserLogInFailedException : Exception
{
    public UserLogInFailedException() : base("User login failed") { }
    public UserLogInFailedException(string message) : base(message) { }
    public UserLogInFailedException(string message, Exception inner) : base(message, inner) { }
}