import { getTransactionsByAccount } from '../Services/TransactionService';
import { Account, Transaction } from '../Models/PanGoldenModels';


const getTransactions = async (account : Account) => {
    if (!account.id) return;
    const transactions = await getTransactionsByAccount(account.id);
    return transactions;
}

const GetBalance = async ( account : Account) => {
    const transactions = await getTransactions(account);
    if (!transactions || transactions.length === 0) return account.untrackedBalance;
    let balance = account.untrackedBalance || 0;
    transactions.forEach((transaction: Transaction) => {
        switch (transaction.type) {
            case 0:
                balance += transaction.amount || 0;
                break;
            case 1:
                balance -= transaction.amount || 0;
                break;
            default:
                break;
        }
    });

    return balance;
}

export default GetBalance;