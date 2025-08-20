const fs = require('fs');
const path = require('path');

// Read the mock data file
const mockDataPath = path.join(__dirname, 'src', 'data', 'mockData.json');
const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));

// Exchange rate: 1 USD = 83 INR (approximate)
const USD_TO_INR = 83;

// Convert amount from USD to INR
function convertToINR(amount) {
  return Math.round(amount * USD_TO_INR * 100) / 100; // Round to 2 decimal places
}

// Convert all accounts
mockData.accounts.forEach(account => {
  account.balance = convertToINR(account.balance);
});

// Convert all wallets
mockData.wallets.forEach(wallet => {
  wallet.balance = convertToINR(wallet.balance);
});

// Convert all transactions
mockData.transactions.forEach(transaction => {
  transaction.amount = convertToINR(transaction.amount);
});

// Convert all budgets
mockData.budgets.forEach(budget => {
  budget.amount = convertToINR(budget.amount);
  budget.spent = convertToINR(budget.spent);
});

// Write back to file
fs.writeFileSync(mockDataPath, JSON.stringify(mockData, null, 2), 'utf8');

console.log('Successfully converted all amounts from USD to INR!');
console.log('Exchange rate used: 1 USD = 83 INR');
