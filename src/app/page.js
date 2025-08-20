"use client";

import Link from "next/link";
import { calculateTotals, formatCurrency } from '@/data/dataUtils';

export default function Home() {
  const { income, expenses, totalBalance, savings } = calculateTotals();

  const features = [
    {
      icon: "📊",
      title: "Dashboard",
      description: "Get a complete overview of your finances",
      href: "/dashboard",
      color: "#3b82f6"
    },
    {
      icon: "💰",
      title: "Expenses",
      description: "Track and categorize your spending",
      href: "/expenses",
      color: "#ef4444"
    },
    {
      icon: "👛",
      title: "Wallets",
      description: "Manage your payment methods",
      href: "/wallets",
      color: "#8b5cf6"
    },
    {
      icon: "📈",
      title: "Summary",
      description: "View trends and insights",
      href: "/summary",
      color: "#22c55e"
    },
    {
      icon: "👤",
      title: "Accounts",
      description: "Track your financial accounts",
      href: "/accounts",
      color: "#06b6d4"
    },
    {
      icon: "⚙️",
      title: "Settings",
      description: "Customize your experience",
      href: "/settings",
      color: "#64748b"
    }
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '800', 
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          // background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          // WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          💰 Expense Tracker
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#64748b', 
          maxWidth: '600px', 
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Your one-stop solution for managing expenses efficiently. Track spending, monitor budgets, and achieve your financial goals.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="card-grid card-grid-4" style={{ marginBottom: '3rem' }}>
        <div className="card stats-card balance">
          <div className="stats-label">Total Balance</div>
          <div className="stats-value neutral">{formatCurrency(totalBalance)}</div>
        </div>
        <div className="card stats-card income">
          <div className="stats-label">This Month Income</div>
          <div className="stats-value positive">{formatCurrency(income)}</div>
        </div>
        <div className="card stats-card expense">
          <div className="stats-label">This Month Expenses</div>
          <div className="stats-value negative">{formatCurrency(expenses)}</div>
        </div>
        <div className="card stats-card savings">
          <div className="stats-label">Savings</div>
          <div className={`stats-value ${savings >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(savings)}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem', 
          color: '#1e293b',
          fontSize: '2rem',
          fontWeight: '700'
        }}>
          Explore Features
        </h2>
        
        <div className="card-grid card-grid-3">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  backgroundColor: feature.color + '20',
                  color: feature.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                
                <h3 style={{ 
                  fontWeight: '600', 
                  color: '#1e293b', 
                  marginBottom: '0.5rem',
                  fontSize: '1.125rem'
                }}>
                  {feature.title}
                </h3>
                
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  flex: '1'
                }}>
                  {feature.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '1rem',
                  color: feature.color,
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  Get Started →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="card" style={{ 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        border: 'none'
      }}>
        <h3 style={{ 
          color: '#1e293b', 
          marginBottom: '1rem',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          Ready to take control of your finances?
        </h3>
        <p style={{ 
          color: '#64748b', 
          marginBottom: '2rem',
          fontSize: '1rem'
        }}>
          Start by exploring your dashboard or adding your first expense.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            📊 View Dashboard
          </Link>
          <Link href="/expenses" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
            💰 Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
}