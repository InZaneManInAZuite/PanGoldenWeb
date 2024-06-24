// Exception class when user already exists

namespace backend.Exceptions;
public class ExistingUserException : Exception
{
    public ExistingUserException() : base("User already exists") { }
    public ExistingUserException(string message) : base(message) { }
    public ExistingUserException(string message, Exception inner) : base(message, inner) { }
}