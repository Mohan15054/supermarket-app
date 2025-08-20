// Data access utility functions
import mockData from '../data/mockData.json';

// Helper function to calculate totals
export const calculateTotals = () => {
  const transactions = mockData.transactions;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthTransactions = transactions.filter(txn => {
    const txnDate = new Date(txn.date);
    return txnDate.getMonth() === currentMonth && txnDate.getFullYear() === currentYear;
  });
  
  const income = thisMonthTransactions
    .filter(txn => txn.type === 'income')
    .reduce((sum, txn) => sum + txn.amount, 0);
    
  const expenses = Math.abs(thisMonthTransactions
    .filter(txn => txn.type === 'expense')
    .reduce((sum, txn) => sum + txn.amount, 0));
    
  const totalBalance = mockData.wallets.reduce((sum, wallet) => sum + wallet.balance, 0);
  const savings = income - expenses;
  
  return { income, expenses, totalBalance, savings };
};

// Get category spending for current month
export const getCategorySpending = () => {
  const transactions = mockData.transactions;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const thisMonthExpenses = transactions.filter(txn => {
    const txnDate = new Date(txn.date);
    return txnDate.getMonth() === currentMonth && 
           txnDate.getFullYear() === currentYear && 
           txn.type === 'expense';
  });
  
  const categoryTotals = {};
  
  thisMonthExpenses.forEach(txn => {
    const category = mockData.categories.find(cat => cat.id === txn.category);
    if (category) {
      if (!categoryTotals[category.name]) {
        categoryTotals[category.name] = {
          amount: 0,
          color: category.color,
          icon: category.icon
        };
      }
      categoryTotals[category.name].amount += Math.abs(txn.amount);
    }
  });
  
  return Object.entries(categoryTotals)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.amount - a.amount);
};

// Get recent transactions
export const getRecentTransactions = (limit = 5) => {
  return mockData.transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
    .map(txn => ({
      ...txn,
      category: mockData.categories.find(cat => cat.id === txn.category),
      wallet: mockData.wallets.find(wallet => wallet.id === txn.wallet)
    }));
};

// Get top spending categories (top 3)
export const getTopSpendingCategories = () => {
  return getCategorySpending().slice(0, 3);
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
};

// Get all data
export const getAllData = () => mockData;

// Get data by type
export const getWallets = () => mockData.wallets;
export const getAccounts = () => mockData.accounts;
export const getCategories = () => mockData.categories;
export const getTransactions = () => mockData.transactions;
export const getSettings = () => mockData.settings;
export const getBudgets = () => mockData.budgets;
