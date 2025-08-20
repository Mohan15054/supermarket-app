"use client";

import './accounts.css';
import { useState } from 'react';
import { getAccounts, formatCurrency } from '@/data/dataUtils';

export default function Accounts() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  
  const accounts = getAccounts();
  const totalAssets = accounts
    .filter(acc => acc.balance > 0)
    .reduce((sum, acc) => sum + acc.balance, 0);
  const totalLiabilities = Math.abs(accounts
    .filter(acc => acc.balance < 0)
    .reduce((sum, acc) => sum + acc.balance, 0));
  const netWorth = totalAssets - totalLiabilities;

  const handleAddAccount = () => {
    setShowAddForm(true);
    setEditingAccount(null);
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingAccount(null);
  };

  const accountTypes = [
    { value: 'Bank', label: 'Bank Account', icon: '🏦' },
    { value: 'Credit Card', label: 'Credit Card', icon: '💳' },
    { value: 'Loan', label: 'Loan', icon: '📋' },
    { value: 'Investment', label: 'Investment', icon: '📈' },
    { value: 'Savings', label: 'Savings', icon: '💰' }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Accounts</h1>
        <p className="page-subtitle">Track your financial accounts and net worth</p>
      </div>

      {/* Net Worth Overview */}
      <div className="net-worth-overview">
        <div className="net-worth-stats">
          <div className="net-worth-card">
            <div className="net-worth-label">Total Assets</div>
            <div className="net-worth-amount positive">{formatCurrency(totalAssets)}</div>
            <div className="net-worth-icon">💰</div>
          </div>
          <div className="net-worth-card">
            <div className="net-worth-label">Total Liabilities</div>
            <div className="net-worth-amount negative">{formatCurrency(totalLiabilities)}</div>
            <div className="net-worth-icon">💳</div>
          </div>
          <div className="net-worth-card">
            <div className="net-worth-label">Net Worth</div>
            <div className={`net-worth-amount ${netWorth >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(netWorth)}
            </div>
            <div className="net-worth-icon">📊</div>
          </div>
        </div>
      </div>

      {/* Accounts List */}
      <div className="accounts-section">
        <div className="accounts-header">
          <h2 className="accounts-title">All Accounts</h2>
          <button className="btn btn-primary" onClick={handleAddAccount}>
            + Add New Account
          </button>
        </div>
        <div className="accounts-list">
          {accounts.map((account) => {
            const accountType = accountTypes.find(type => type.value === account.type);
            return (
              <div key={account.id} className={`account-item account-type-${account.type.toLowerCase().replace(' ', '-')}`}>
                <div className="account-icon" style={{ backgroundColor: accountType?.value === 'Credit Card' ? '#ef4444' : accountType?.value === 'Bank' ? '#3b82f6' : accountType?.value === 'Loan' ? '#f59e0b' : accountType?.value === 'Investment' ? '#10b981' : '#8b5cf6' }}>
                  {accountType?.icon}
                </div>
                
                <div className="account-details">
                  <h3 className="account-name">{account.name}</h3>
                  <div className="account-type">{account.type}</div>
                </div>
                
                <div className={`account-balance ${account.balance >= 0 ? 'positive' : 'negative'}`}>
                  {formatCurrency(account.balance)}
                </div>
                
                <div className="account-actions">
                  <button 
                    className="account-action-btn edit"
                    onClick={() => handleEditAccount(account)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button 
                    className="account-action-btn delete"
                    onClick={() => {
                      // Handle delete
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
          
          {/* Add New Account Card */}
          <div className="add-account-card" onClick={handleAddAccount}>
            <div className="add-account-icon">+</div>
            <div className="add-account-text">Add New Account</div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fab" onClick={handleAddAccount}>
        +
      </button>

      {/* Add/Edit Account Form Modal */}
      {showAddForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">{editingAccount ? 'Edit Account' : 'Add New Account'}</h2>
              <button 
                onClick={handleCloseForm}
                className="form-close-btn"
              >
                ×
              </button>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Account Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Chase Checking, Capital One Credit Card"
                  defaultValue={editingAccount?.name || ''}
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
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Account Type</label>
                <select 
                  defaultValue={editingAccount?.type || ''}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Select account type</option>
                  {accountTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Current Balance</label>
                <input 
                  type="number" 
                  placeholder="0.00"
                  defaultValue={editingAccount?.balance || ''}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                  Use negative values for debts/loans
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Icon</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
                  {['🏦', '💳', '📋', '📈', '💰', '💎'].map(icon => (
                    <button 
                      key={icon}
                      type="button"
                      style={{
                        padding: '0.75rem',
                        border: editingAccount?.icon === icon ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: editingAccount?.icon === icon ? '#f0f9ff' : 'white',
                        fontSize: '1.25rem',
                        cursor: 'pointer'
                      }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Color</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
                  {['#3b82f6', '#22c55e', '#ef4444', '#8b5cf6', '#f97316', '#06b6d4'].map(color => (
                    <button 
                      key={color}
                      type="button"
                      style={{
                        width: '100%',
                        height: '40px',
                        border: editingAccount?.color === color ? '3px solid #1e293b' : '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: color,
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Account Number (Optional)</label>
                <input 
                  type="text" 
                  placeholder="****1234"
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingAccount ? 'Update Account' : 'Add Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
