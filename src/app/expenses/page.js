"use client";

import './expenses.css';
import { useState } from 'react';
import { 
  getTransactions, 
  getTopSpendingCategories, 
  formatCurrency, 
  formatDate,
  getCategories,
  getWallets 
} from '@/data/dataUtils';

export default function Expenses() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  
  const transactions = getTransactions().filter(txn => txn.type === 'expense');
  const topCategories = getTopSpendingCategories();
  const categories = getCategories().filter(cat => cat.type === 'expense');
  const wallets = getWallets();
  
  const thisMonthTotal = transactions
    .filter(txn => {
      const txnDate = new Date(txn.date);
      const now = new Date();
      return txnDate.getMonth() === now.getMonth() && txnDate.getFullYear() === now.getFullYear();
    })
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

  const transactionsWithDetails = transactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(txn => ({
      ...txn,
      category: categories.find(cat => cat.id === txn.category),
      wallet: wallets.find(wallet => wallet.id === txn.wallet)
    }));

  const handleAddExpense = () => {
    setShowAddForm(true);
    setEditingTransaction(null);
  };

  const handleEditExpense = (transaction) => {
    setEditingTransaction(transaction);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingTransaction(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Expenses</h1>
        <p className="page-subtitle">Track and manage your spending</p>
      </div>

      {/* Summary Card */}
      <div className="card expenses-summary">
        <div className="expenses-summary-header">
          <div className="expenses-total-section">
            <h2 className="expenses-total-label">This Month's Total</h2>
            <div className="expenses-total-amount">
              {formatCurrency(thisMonthTotal)}
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleAddExpense}>
            + Add Expense
          </button>
        </div>
        
        <div className="expenses-categories-section">
          <h3 className="expenses-categories-title">Top 3 Categories</h3>
          <div className="expenses-categories-grid">
            {topCategories.map((category, index) => (
              <div key={index} className="expense-category-card" style={{ 
                background: category.color + '20',
                borderColor: category.color + '40'
              }}>
                <span className="expense-category-icon">{category.icon}</span>
                <div className="expense-category-details">
                  <div className="expense-category-name">{category.name}</div>
                  <div className="expense-category-amount">
                    {formatCurrency(category.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <div className="transactions-section">
        <div className="transactions-header">
          <h2 className="transactions-title">All Expenses</h2>
        </div>
        <div className="transactions-list">
          {transactionsWithDetails.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div 
                className="transaction-icon" 
                style={{ 
                  backgroundColor: transaction.category?.color 
                }}
              >
                {transaction.category?.icon}
              </div>
              <div className="transaction-details">
                <div className="transaction-description">{transaction.description}</div>
                <div className="transaction-meta">
                  <span className="transaction-category">
                    {transaction.category?.name}
                  </span>
                  <span className="transaction-wallet">
                    {transaction.wallet?.name}
                  </span>
                  <span className="transaction-date">
                    {formatDate(transaction.date)}
                  </span>
                  {transaction.notes && (
                    <div className="transaction-notes">
                      {transaction.notes}
                    </div>
                  )}
                </div>
              </div>
              <div className="transaction-amount">
                {formatCurrency(Math.abs(transaction.amount))}
              </div>
              <div className="transaction-actions">
                <button 
                  className="transaction-action-btn edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditExpense(transaction);
                  }}
                  title="Edit"
                >
                  ✏️
                </button>
                <button 
                  className="transaction-action-btn delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete
                  }}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
        {transactionsWithDetails.length === 0 && (
          <div className="expenses-empty">
            <div className="expenses-empty-icon">💸</div>
            <div className="expenses-empty-text">No expenses recorded yet</div>
            <div className="expenses-empty-subtext">Start tracking your spending by adding your first expense</div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button className="fab" onClick={handleAddExpense}>
        +
      </button>

      {/* Add/Edit Form Modal */}
      {showAddForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">{editingTransaction ? 'Edit Expense' : 'Add New Expense'}</h2>
              <button 
                onClick={handleCloseForm}
                className="form-close-btn"
              >
                ×
              </button>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Amount</label>
                <input 
                  type="number" 
                  placeholder="0.00"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category</label>
                <select style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}>
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Wallet</label>
                <select style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}>
                  <option value="">Select wallet</option>
                  {wallets.map(wallet => (
                    <option key={wallet.id} value={wallet.id}>{wallet.icon} {wallet.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Date</label>
                <input 
                  type="datetime-local"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
                <input 
                  type="text" 
                  placeholder="What did you spend on?"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Notes (Optional)</label>
                <textarea 
                  placeholder="Additional notes..."
                  rows="3"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    fontSize: '1rem',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingTransaction ? 'Update Expense' : 'Add Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
