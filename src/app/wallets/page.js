"use client";

import './wallets.css';
import { useState } from 'react';
import { getWallets, formatCurrency } from '@/data/dataUtils';

export default function Wallets() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [editingWallet, setEditingWallet] = useState(null);
  
  const wallets = getWallets();
  const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

  const handleAddWallet = () => {
    setShowAddForm(true);
    setEditingWallet(null);
  };

  const handleEditWallet = (wallet) => {
    setEditingWallet(wallet);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setShowTransferForm(false);
    setEditingWallet(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Wallets</h1>
        <p className="page-subtitle">Manage your payment methods and balances</p>
      </div>

      {/* Total Balance Card */}
      <div className="card wallets-total-balance">
        <div className="wallets-balance-header">
          <h2 className="wallets-balance-label">Total Balance</h2>
          <div className="wallets-balance-amount">
            {formatCurrency(totalBalance)}
          </div>
        </div>
        <div className="wallets-actions">
          <button className="btn btn-primary" onClick={handleAddWallet}>
            + Add Wallet
          </button>
          <button className="btn btn-secondary" onClick={() => setShowTransferForm(true)}>
            🔄 Transfer Money
          </button>
        </div>
      </div>

      {/* Wallets Grid */}
      <div className="wallets-grid">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="wallet-card" style={{ '--wallet-color': wallet.color }}>
            <div className="wallet-header">
              <div className="wallet-info">
                <h3 className="wallet-name">{wallet.name}</h3>
                <p className="wallet-type">Payment Wallet</p>
              </div>
              <div className="wallet-icon" style={{ backgroundColor: wallet.color + '20', color: wallet.color }}>
                {wallet.icon}
              </div>
            </div>
            
            <div className={`wallet-balance ${wallet.balance >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(wallet.balance)}
            </div>
            
            <div className="wallet-actions">
              <button 
                className="wallet-action-btn edit"
                onClick={() => handleEditWallet(wallet)}
              >
                Edit
              </button>
              <button 
                className="wallet-action-btn delete"
                onClick={() => {
                  // Handle delete
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        
        {/* Add New Wallet Card */}
        <div className="add-wallet-card" onClick={handleAddWallet}>
          <div className="add-wallet-icon">+</div>
          <div className="add-wallet-text">Add New Wallet</div>
        </div>
      </div>

      {/* Add/Edit Wallet Form Modal */}
      {showAddForm && (
        <div className="form-overlay">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">{editingWallet ? 'Edit Wallet' : 'Add New Wallet'}</h2>
              <button 
                onClick={handleCloseForm}
                className="form-close-btn"
              >
                ×
              </button>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Wallet Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Main Card, Cash, Savings"
                  defaultValue={editingWallet?.name || ''}
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
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Initial Balance</label>
                <input 
                  type="number" 
                  placeholder="0.00"
                  defaultValue={editingWallet?.balance || ''}
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
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Icon</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
                  {['💵', '💳', '💰', '🏦', '💎', '🪙'].map(icon => (
                    <button 
                      key={icon}
                      type="button"
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: 'white',
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
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        background: color,
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  {editingWallet ? 'Update Wallet' : 'Add Wallet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Transfer Form Modal */}
      {showTransferForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div className="card" style={{ 
            width: '100%', 
            maxWidth: '400px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>Transfer Money</h2>
              <button 
                onClick={handleCloseForm}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>From Wallet</label>
                <select style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}>
                  <option value="">Select source wallet</option>
                  {wallets.map(wallet => (
                    <option key={wallet.id} value={wallet.id}>
                      {wallet.icon} {wallet.name} ({formatCurrency(wallet.balance)})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>To Wallet</label>
                <select style={{ 
                  width: '100%', 
                  padding: '0.75rem', 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}>
                  <option value="">Select destination wallet</option>
                  {wallets.map(wallet => (
                    <option key={wallet.id} value={wallet.id}>
                      {wallet.icon} {wallet.name}
                    </option>
                  ))}
                </select>
              </div>
              
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
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Notes (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Transfer description..."
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
                  Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
