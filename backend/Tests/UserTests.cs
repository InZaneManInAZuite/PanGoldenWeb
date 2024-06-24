// Set of tests for the User class

using System;
using Xunit;

using backend.Exceptions;
using backend.Models;
using backend.Services;
using backend.Tests;

namespace backend.Tests
{
    public class UserTests
    {
        [Fact]
        public void TestAddDuplicateUser()
        {
            // Arrange
            UserTestsCLI.Run(UserTestEnum.CLEARUSERS);
            UserTestsCLI.Run(UserTestEnum.MAKE1USER);

            // Act & Assert
            Assert.Throws<ExistingUserException>(() => UserTestsCLI.Run(UserTestEnum.MAKE1USER));
        }

        [Fact]
        public void TestUpdateNameButNotUserName()
        {
            // Arrange
            UserTestsCLI.Run(UserTestEnum.CLEARUSERS);
            UserTestsCLI.Run(UserTestEnum.MAKE1USER);
            var user = UserService.GetByUsername(UserTestsCLI.TestUsers[0].Username);

            // Act
            user.FirstName = "Trusty" + user.FirstName;
            user.LastName = "Guy" + user.LastName;
            UserService.Update(user);

            // Assert
            var updatedUser = UserService.GetByUsername(user.Username);
            Assert.Equal(updatedUser.FirstName, "Trusty" + user.FirstName);
            Assert.Equal(updatedUser.LastName, "Guy" + user.LastName);
        }

        [Fact]
        public void TestDeleteUser()
        {
            UserTestsCLI.Run(UserTestEnum.CLEARUSERS);
            UserTestsCLI.Run(UserTestEnum.MAKE1USER);
            var user = UserService.GetByUsername(UserTestsCLI.TestUsers[0].Username);
            UserService.Delete(user.Id);
            Assert.Empty(UserService.GetAll());
        }

        [Fact]
        public void TestChangeUsername()
        {
            UserTestsCLI.Run(UserTestEnum.CLEARUSERS);
            UserTestsCLI.Run(UserTestEnum.MAKE1USER);
            var user = UserService.GetByUsername(UserTestsCLI.TestUsers[0].Username);
            user.Username = "newusername";
            UserService.Update(user);
            Assert.Throws<UserNotFoundException>(() => UserService.GetByUsername(UserTestsCLI.TestUsers[0].Username));
            Assert.Equal(user, UserService.GetByUsername("newusername"));
        }
    }
}
