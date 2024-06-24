// Create a set of commands and users to use for testing the User class

using System;


using backend.Exceptions;
using backend.Models;
using backend.Services;
namespace backend.Tests;

public enum UserTestEnum
{
    MAKE1USER, MAKE2USERS, MAKE10USERS, CLEARUSERS
}

public static class UserTestsCLI
{
    public static List<User> TestUsers { get; }

    static UserTestsCLI(){
        TestUsers = new List<User>();
        TestUsers.Add(new User { FirstName = "John", LastName = "Doe", Username = "test1johndoe", Password = "pass1word" });
        TestUsers.Add(new User { FirstName = "Jane", LastName = "Doe", Username = "test2janedoe", Password = "pass2word" });
        TestUsers.Add(new User { FirstName = "Jim", LastName = "Doe", Username = "test3jimdoe", Password = "pass3word" });
        TestUsers.Add(new User { FirstName = "Jill", LastName = "Murry", Username = "test4jillmurry1", Password = "pass4word" });
        TestUsers.Add(new User { FirstName = "Jack", LastName = "Murry", Username = "test5jackmurry", Password = "pass5word" });
        TestUsers.Add(new User { FirstName = "Jill", LastName = "Murry", Username = "test6jillmurry2", Password = "pass6word" });
        TestUsers.Add(new User { FirstName = "Toshiro", LastName = "Mendoza", Username = "inzanemaninazuite", Password = "pass7word" });
        TestUsers.Add(new User { FirstName = "Rando", LastName = "Person", Username = "tes8randomperson", Password = "pass8word" });
        TestUsers.Add(new User { FirstName = "John", LastName = "Smith", Username = "test9johnsmith", Password = "pass9word" });
        TestUsers.Add(new User { FirstName = "Jane", LastName = "Smith", Username = "test10janesmith", Password = "pass10word" });
    }
    public static void Run(UserTestEnum command)
    {
        switch (command)
        {
            case UserTestEnum.MAKE1USER:
                UserService.Add(TestUsers[0]);
                break;
            case UserTestEnum.MAKE2USERS:
                UserService.Add(TestUsers[0]);
                UserService.Add(TestUsers[1]);
                break;
            case UserTestEnum.MAKE10USERS:
                foreach (var user in TestUsers)
                {
                    UserService.Add(user);
                }
                break;
            case UserTestEnum.CLEARUSERS:
                UserService.Clear();
                break;
            default:
                throw new Exception("Invalid command");
        }
    }
}