"use client";

import './settings.css';
import { useState } from 'react';
import { getSettings, getCategories, getAllData } from '@/data/dataUtils';

export default function Settings() {
  const [settings, setSettings] = useState(getSettings());
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  const categories = getCategories();
  const userData = getAllData().user;

  const handleToggle = (section, key) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key]
      }
    }));
  };

  const handleThemeChange = (theme) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        theme
      }
    }));
  };

  const handleAddCategory = () => {
    setShowCategoryForm(true);
    setEditingCategory(null);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleCloseForm = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
  };

  const SettingItem = ({ icon, title, description, children }) => (
    <div className="setting-item">
      <div className="setting-icon">
        {icon}
      </div>
      <div className="setting-content">
        <div className="setting-title">
          {title}
        </div>
        {description && (
          <div className="setting-description">
            {description}
          </div>
        )}
      </div>
      <div className="setting-control">
        {children}
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      style={{
        width: '48px',
        height: '24px',
        borderRadius: '12px',
        border: 'none',
        background: checked ? 'var(--color-success-500)' : 'var(--color-border)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'white',
        position: 'absolute',
        top: '2px',
        left: checked ? '26px' : '2px',
        transition: 'all 0.2s ease'
      }} />
    </button>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Customize your expense tracker experience</p>
      </div>

      {/* Profile Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>👤 Profile</h2>
        
        <SettingItem
          icon="👤"
          title="Name"
          description="Your display name"
        >
          <input 
            type="text" 
            defaultValue={userData.name}
            style={{
              padding: '0.5rem',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              width: '200px',
              background: 'var(--color-surface)',
              color: 'var(--color-text-primary)'
            }}
          />
        </SettingItem>

        <SettingItem
          icon="📧"
          title="Email"
          description="Your email address"
        >
          <input 
            type="email" 
            defaultValue={userData.email}
            style={{
              padding: '0.5rem',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              width: '200px',
              background: 'var(--color-surface)',
              color: 'var(--color-text-primary)'
            }}
          />
        </SettingItem>

        <SettingItem
          icon="💰"
          title="Currency"
          description="Your preferred currency"
        >
          <select 
            defaultValue={userData.currency}
            style={{
              padding: '0.5rem',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              width: '120px',
              background: 'var(--color-surface)',
              color: 'var(--color-text-primary)'
            }}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </SettingItem>

        <SettingItem
          icon="🕐"
          title="Timezone"
          description="Your timezone"
        >
          <select 
            defaultValue={userData.timezone}
            style={{
              padding: '0.5rem',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              width: '200px',
              background: 'var(--color-surface)',
              color: 'var(--color-text-primary)'
            }}
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </SettingItem>
      </div>

      {/* Categories Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ color: 'var(--color-text-primary)' }}>🏷️ Categories</h2>
          <button className="btn btn-primary" onClick={handleAddCategory}>
            + Add Category
          </button>
        </div>
        
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {categories.map((category) => (
            <div key={category.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              background: 'var(--color-surface)',
              borderRadius: '8px',
              border: '1px solid var(--color-border)'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: category.color + '20',
                color: category.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '1rem'
              }}>
                {category.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>{category.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {category.type === 'income' ? 'Income' : 'Expense'} Category
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem', fontSize: '0.75rem' }}
                  onClick={() => handleEditCategory(category)}
                >
                  ✏️
                </button>
                <button 
                  className="btn btn-error"
                  style={{ padding: '0.5rem', fontSize: '0.75rem' }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>🔔 Notifications</h2>
        
        <SettingItem
          icon="⏰"
          title="Daily Reminders"
          description="Get reminded to track your expenses"
        >
          <Toggle 
            checked={settings.notifications.reminderEnabled}
            onChange={() => handleToggle('notifications', 'reminderEnabled')}
          />
        </SettingItem>

        <SettingItem
          icon="💸"
          title="Budget Alerts"
          description="Notifications when you're close to budget limits"
        >
          <Toggle 
            checked={settings.notifications.budgetAlerts}
            onChange={() => handleToggle('notifications', 'budgetAlerts')}
          />
        </SettingItem>

        <SettingItem
          icon="📱"
          title="Transaction Alerts"
          description="Notifications for every transaction"
        >
          <Toggle 
            checked={settings.notifications.transactionAlerts}
            onChange={() => handleToggle('notifications', 'transactionAlerts')}
          />
        </SettingItem>
      </div>

      {/* Security Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>🔒 Security</h2>
        
        <SettingItem
          icon="🔢"
          title="PIN Protection"
          description="Require PIN to access the app"
        >
          <Toggle 
            checked={settings.security.pinEnabled}
            onChange={() => handleToggle('security', 'pinEnabled')}
          />
        </SettingItem>

        <SettingItem
          icon="👆"
          title="Biometric Login"
          description="Use fingerprint or face recognition"
        >
          <Toggle 
            checked={settings.security.biometricEnabled}
            onChange={() => handleToggle('security', 'biometricEnabled')}
          />
        </SettingItem>
      </div>

      {/* Theme Section */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>🎨 Appearance</h2>
        
        <SettingItem
          icon="🌙"
          title="Theme"
          description="Choose your preferred theme"
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className={`btn ${settings.preferences.theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              onClick={() => handleThemeChange('light')}
            >
              ☀️ Light
            </button>
            <button 
              className={`btn ${settings.preferences.theme === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
              onClick={() => handleThemeChange('dark')}
            >
              🌙 Dark
            </button>
          </div>
        </SettingItem>
      </div>

      {/* Data Section */}
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>💾 Data</h2>
        
        <SettingItem
          icon="📤"
          title="Export Data"
          description="Download your data as CSV"
        >
          <button className="btn btn-secondary">
            Export
          </button>
        </SettingItem>

        <SettingItem
          icon="📥"
          title="Import Data"
          description="Import data from CSV file"
        >
          <button className="btn btn-secondary">
            Import
          </button>
        </SettingItem>

        <SettingItem
          icon="🗑️"
          title="Clear All Data"
          description="Remove all transactions and reset the app"
        >
          <button className="btn btn-error">
            Clear Data
          </button>
        </SettingItem>
      </div>

      {/* Category Form Modal */}
      {showCategoryForm && (
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
              <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button 
                onClick={handleCloseForm}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., Entertainment, Groceries"
                  defaultValue={editingCategory?.name || ''}
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
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Type</label>
                <select 
                  defaultValue={editingCategory?.type || 'expense'}
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Icon</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
                  {['🍽️', '🚗', '🛍️', '🎬', '📱', '🏥', '💼', '💻', '⚡', '🎮', '📚', '✈️'].map(icon => (
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
                  {['#f97316', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444', '#06b6d4', '#22c55e', '#10b981'].map(color => (
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
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
