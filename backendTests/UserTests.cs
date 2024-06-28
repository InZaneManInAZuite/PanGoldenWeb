// Set of tests for the User class
using Xunit;

using backend.Exceptions;
using backend.Models;
using backend.Services;

namespace backendTests
{
    public class UserTests
    {
        [Fact]
        public void TestAddDuplicateUser()
        {
            // Arrange
            UserTestActions.Run(UserTestEnum.CLEARUSERS);
            UserTestActions.Run(UserTestEnum.MAKE1USER);

            // Act & Assert
            Assert.Throws<ExistingUserException>(() => UserTestActions.Run(UserTestEnum.MAKE1USER));
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        [InlineData(6)]
        [InlineData(7)]
        [InlineData(8)]
        [InlineData(9)]
        public void TestUpdateNameButNotUserName(int value)
        {
            // Arrange
            UserTestActions.Run(UserTestEnum.CLEARUSERS);
            UserTestActions.Run(UserTestEnum.MAKE10USERS);
            User user = UserTestActions.TestUsers[value];
            User userCopy = user.copy();

            // Act
            userCopy.firstName = "Trusty" + user.firstName;
            userCopy.lastName = "Guy" + user.lastName;
            User updatedUser = UserService.Update(userCopy);

            // Assert
            Assert.Equal("Trusty" + user.firstName, updatedUser.firstName);
            Assert.Equal("Guy" + user.lastName, updatedUser.lastName);
        }

        [Fact]
        public void TestDeleteUser()
        {
            UserTestActions.Run(UserTestEnum.CLEARUSERS);
            UserTestActions.Run(UserTestEnum.MAKE1USER);
            User user = UserTestActions.TestUsers[0];
            UserService.Delete(user.id);
            Assert.Empty(UserService.GetAll());
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        [InlineData(4)]
        [InlineData(5)]
        [InlineData(6)]
        [InlineData(7)]
        [InlineData(8)]
        public void TestChangeUsernameToExisting(int value)
        {
            UserTestActions.Run(UserTestEnum.CLEARUSERS);
            UserTestActions.Run(UserTestEnum.MAKE10USERS);
            User user = UserTestActions.TestUsers[value];
            User userCopy = user.copy();
            userCopy.username = UserTestActions.TestUsers[value + 1].username;
            Assert.Throws<ExistingUserException>(() => UserService.Update(userCopy));
        }

        [Fact]
        public void TestClearUsers()
        {
            UserTestActions.Run(UserTestEnum.CLEARUSERS);
            UserTestActions.Run(UserTestEnum.MAKE10USERS);
            UserTestActions.Run(UserTestEnum.CLEARUSERS);
            Assert.Empty(UserService.GetAll());
        }
    }
}
