# PanGoldenWeb
PanGolden is a web application that allows a user to keep track of financial expenses.
It lets you create your user in which 

# Table of Content

- [Installation](#installation)
- [Preperation](#preperation)
- [Usage](#usage)
- [Requirements](#requirements)


# Installation

Note that this program uses node.js, .NET8.0, Typescript, and SQL in order to operate.
Not having these programs will result in PanGolden not working. 

In order to install the program, clone the repository from:

git clone https://github.com/InZaneManInAZuite/PanGoldenWeb.git

Go to the backend, and install its dependencies.

cd ./backend
dotnet add package

Then go set up the frontend of the PanGolden.

cd ../frontend
npm install

# Preperation

Before the program can be used locally, both the frontend and the backend needs
to be started first. This can be done as follows:

cd ./backend
dotnet run

Then in another terminal:

cd ./frontend
npm run build

After waiting for both parts of the program to load, PanGolden should now be ready to use
locally in your device.

# Usage

## Authentication Page

One of the first things you will probably see when entering PanGolden would be the login form.
Here you may select to 'Create an account', in this case a user account, if you do not have one 
yet. The form should change in to a sign up form. After signing-up, you will be shown back to the 
login form where you can login.

## Accounts Page

Next, you will see is the accounts page. Here is where you can make accounts by clicking the 'Add Account' 
Button and can place a starting balance. Once you've made your desired accounts, you have the option click
on the three dots beside their cards where an option to edit the account, or delete the account would show
up. Clicking the edit button will send you to a new page where you can edit the selected account's name and
starting balance. Clicking the delete button will show a pop-up on the top of your screen confirming your
intent of deleting said account.

## Transaction Page

You may be interested in storing not just the starting balance of your accounts but their transactions as well.
You may find these stored transactions by going to the transaction page by either clicking the "Transactions"
menu on the side of your PC, or clicking the three lines on the top right of your phones which would trigger
the menus to show up. Here, is where you can go to the "Transactions" page through PanGolden's navigation
bars. Another way to go to the transaction page is by simply selecting one of the accounts card from the
"Accounts" page. This will proply show you the transactions you have on that account specifically.

At the transaction page, you will be able to see a table containing the transactions you have on a selected
account. Right on top, you have the option to change the selected account together with that accounts total balance.
Right bellow this is where you can add more transactions into the table. On the sides of each transaction you can also
find tools to edit or delete these transactions.

## User Page

Once you are satisfied with using the app, you can head on to the user page. Here, you will be able to see 



# Requirements


