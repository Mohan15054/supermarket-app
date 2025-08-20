"use client";

import './dashboard.css';
import { 
  calculateTotals, 
  getCategorySpending, 
  getRecentTransactions, 
  formatCurrency, 
  formatDate 
} from '@/data/dataUtils';

export default function Dashboard() {
  const { income, expenses, totalBalance, savings } = calculateTotals();
  const categorySpending = getCategorySpending();
  const recentTransactions = getRecentTransactions(5);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Your financial overview at a glance</p>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="card-grid card-grid-4">
        <div className="card stats-card balance enhanced">
          <div className="stats-icon">💰</div>
          <div className="stats-label">Total Balance</div>
          <div className="stats-value neutral">{formatCurrency(totalBalance)}</div>
          <div className="stats-change positive">+2.5% from last month</div>
        </div>
        <div className="card stats-card income enhanced">
          <div className="stats-icon">📈</div>
          <div className="stats-label">This Month Income</div>
          <div className="stats-value positive">{formatCurrency(income)}</div>
          <div className="stats-change positive">+12.3% from last month</div>
        </div>
        <div className="card stats-card expense enhanced">
          <div className="stats-icon">💸</div>
          <div className="stats-label">This Month Expenses</div>
          <div className="stats-value negative">{formatCurrency(expenses)}</div>
          <div className="stats-change negative">+8.7% from last month</div>
        </div>
        <div className="card stats-card savings enhanced">
          <div className="stats-icon">🎯</div>
          <div className="stats-label">Savings</div>
          <div className={`stats-value ${savings >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(savings)}
          </div>
          <div className={`stats-change ${savings >= 0 ? 'positive' : 'negative'}`}>
            {savings >= 0 ? '+15.2%' : '-5.1%'} from last month
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Category Spending Chart */}
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>Top Spending Categories</h2>
          <div className="category-spending">
            {categorySpending.slice(0, 5).map((category, index) => (
              <div key={index} className="spending-item">
                <div className="spending-info">
                  <span 
                    className="category-icon" 
                    style={{ backgroundColor: category.color + '20', color: category.color }}
                  >
                    {category.icon}
                  </span>
                  <div>
                    <div className="spending-name">{category.name}</div>
                    <div className="spending-amount">{formatCurrency(category.amount)}</div>
                  </div>
                </div>
                <div className="spending-bar">
                  <div 
                    className="spending-progress" 
                    style={{ 
                      width: `${(category.amount / categorySpending[0].amount) * 100}%`,
                      backgroundColor: category.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>Recent Transactions</h2>
          <div className="transaction-list">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div 
                  className="transaction-icon" 
                  style={{ 
                    backgroundColor: transaction.category.color + '20',
                    color: transaction.category.color 
                  }}
                >
                  {transaction.category.icon}
                </div>
                <div className="transaction-details">
                  <div className="transaction-description">{transaction.description}</div>
                  <div className="transaction-meta">
                    {transaction.wallet.name} • {formatDate(transaction.date)}
                  </div>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : ''}
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
