// Create a set of commands and users to use for testing the User class

using System;

using backend.Exceptions;
using backend.Models;
using backend.Services;
namespace backendTests;

public enum UserTestEnum
{
    MAKE1USER, MAKE2USERS, MAKE10USERS, CLEARUSERS
}

public static class UserTestActions
{
    public static List<User> TestUsers { get; }

    static UserTestActions(){
        TestUsers = new List<User>();
        TestUsers.Add(new User { firstName = "John", lastName = "Doe", username = "test1johndoe", password = "pass1word" });
        TestUsers.Add(new User { firstName = "Jane", lastName = "Doe", username = "test2janedoe", password = "pass2word" });
        TestUsers.Add(new User { firstName = "Jim", lastName = "Doe", username = "test3jimdoe", password = "pass3word" });
        TestUsers.Add(new User { firstName = "Jill", lastName = "Murry", username = "test4jillmurry1", password = "pass4word" });
        TestUsers.Add(new User { firstName = "Jack", lastName = "Murry", username = "test5jackmurry", password = "pass5word" });
        TestUsers.Add(new User { firstName = "Jill", lastName = "Murry", username = "test6jillmurry2", password = "pass6word" });
        TestUsers.Add(new User { firstName = "Toshiro", lastName = "Mendoza", username = "inzanemaninazuite", password = "pass7word" });
        TestUsers.Add(new User { firstName = "Rando", lastName = "Person", username = "tes8randomperson", password = "pass8word" });
        TestUsers.Add(new User { firstName = "John", lastName = "Smith", username = "test9johnsmith", password = "pass9word" });
        TestUsers.Add(new User { firstName = "Jane", lastName = "Smith", username = "test10janesmith", password = "pass10word" });
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