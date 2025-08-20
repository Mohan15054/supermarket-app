"use client";

import './summary.css';
import { getTransactions, formatCurrency, getCategorySpending } from '@/data/dataUtils';

export default function Summary() {
  const transactions = getTransactions();
  const categorySpending = getCategorySpending();
  
  // Calculate monthly data
  const monthlyData = [];
  const currentYear = new Date().getFullYear();
  
  for (let month = 0; month < 12; month++) {
    const monthTransactions = transactions.filter(txn => {
      const txnDate = new Date(txn.date);
      return txnDate.getMonth() === month && txnDate.getFullYear() === currentYear;
    });
    
    const income = monthTransactions
      .filter(txn => txn.type === 'income')
      .reduce((sum, txn) => sum + txn.amount, 0);
      
    const expenses = Math.abs(monthTransactions
      .filter(txn => txn.type === 'expense')
      .reduce((sum, txn) => sum + txn.amount, 0));
    
    monthlyData.push({
      month: new Date(currentYear, month).toLocaleDateString('en-US', { month: 'short' }),
      income,
      expenses,
      net: income - expenses
    });
  }
  
  const currentMonth = new Date().getMonth();
  const thisMonthData = monthlyData[currentMonth];
  
  // Weekly data for current month
  const weeklyData = [];
  const startOfMonth = new Date(currentYear, currentMonth, 1);
  const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
  
  for (let week = 0; week < 4; week++) {
    const weekStart = new Date(startOfMonth);
    weekStart.setDate(1 + (week * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    if (weekEnd > endOfMonth) weekEnd.setTime(endOfMonth.getTime());
    
    const weekTransactions = transactions.filter(txn => {
      const txnDate = new Date(txn.date);
      return txnDate >= weekStart && txnDate <= weekEnd;
    });
    
    const weekExpenses = Math.abs(weekTransactions
      .filter(txn => txn.type === 'expense')
      .reduce((sum, txn) => sum + txn.amount, 0));
    
    weeklyData.push({
      week: `Week ${week + 1}`,
      amount: weekExpenses
    });
  }
  
  const maxWeeklyAmount = Math.max(...weeklyData.map(w => w.amount));

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Summary</h1>
        <p className="page-subtitle">Your financial insights and trends</p>
      </div>

      {/* Current Month Stats */}
      <div className="current-month-stats">
        <div className="current-month-header">
          <h2 className="current-month-title">This Month Overview</h2>
          <p className="current-month-subtitle">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="current-month-grid">
          <div className="month-stat-card income">
            <div className="month-stat-icon income">💰</div>
            <div className="month-stat-label">Income</div>
            <div className="month-stat-amount positive">{formatCurrency(thisMonthData.income)}</div>
          </div>
          <div className="month-stat-card expense">
            <div className="month-stat-icon expense">💸</div>
            <div className="month-stat-label">Expenses</div>
            <div className="month-stat-amount negative">{formatCurrency(thisMonthData.expenses)}</div>
          </div>
          <div className="month-stat-card net">
            <div className="month-stat-icon net">📊</div>
            <div className="month-stat-label">Net</div>
            <div className={`month-stat-amount ${thisMonthData.net >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(thisMonthData.net)}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Weekly Trend */}
        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">Weekly Spending Trend</h2>
            <p className="chart-subtitle">Current month breakdown</p>
          </div>
          <div className="weekly-chart">
            {weeklyData.map((week, index) => (
              <div key={index} className="weekly-item">
                <div className="weekly-week">{week.week}</div>
                <div className="weekly-bar-container">
                  <div className="weekly-bar">
                    <div 
                      className="weekly-bar-fill positive"
                      style={{ width: `${(week.amount / maxWeeklyAmount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="weekly-amount positive">
                  {formatCurrency(week.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">Monthly Overview</h2>
            <p className="chart-subtitle">Year-to-date trends</p>
          </div>
          <div className="monthly-chart">
            {monthlyData.slice(0, 6).map((month, index) => (
              <div key={index} className="monthly-item">
                <div className="monthly-month">{month.month}</div>
                <div className="monthly-bars">
                  <div 
                    className="monthly-bar income"
                    style={{ '--bar-width': `${(month.income / Math.max(...monthlyData.map(m => Math.max(m.income, m.expenses)))) * 100}%` }}
                  ></div>
                  <div 
                    className="monthly-bar expense"
                    style={{ '--bar-width': `${(month.expenses / Math.max(...monthlyData.map(m => Math.max(m.income, m.expenses)))) * 100}%` }}
                  ></div>
                </div>
                <div className="monthly-amounts">
                  <div className="monthly-amount income">+{formatCurrency(month.income)}</div>
                  <div className="monthly-amount expense">-{formatCurrency(month.expenses)}</div>
                </div>
                <div className={`monthly-net ${month.net >= 0 ? 'positive' : 'negative'}`}>
                  {formatCurrency(month.net)}
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>

      {/* Calendar Heatmap */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Daily Spending (Current Month)</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: '0.5rem',
          maxWidth: '500px'
        }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ 
              textAlign: 'center', 
              fontSize: '0.75rem', 
              color: '#64748b',
              padding: '0.5rem'
            }}>
              {day}
            </div>
          ))}
          
          {Array.from({ length: 31 }, (_, i) => {
            const dayExpenses = transactions
              .filter(txn => {
                const txnDate = new Date(txn.date);
                return txnDate.getDate() === i + 1 && 
                       txnDate.getMonth() === currentMonth &&
                       txn.type === 'expense';
              })
              .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);
            
            const intensity = dayExpenses > 0 ? Math.min(dayExpenses / 100, 1) : 0;
            
            return (
              <div key={i} style={{
                width: '32px',
                height: '32px',
                backgroundColor: dayExpenses > 0 ? `rgba(239, 68, 68, ${intensity})` : '#f1f5f9',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                color: intensity > 0.5 ? 'white' : '#64748b',
                border: '1px solid #e2e8f0'
              }}>
                {i + 1}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#64748b' }}>
          Darker colors indicate higher spending days
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Category Breakdown</h2>
        <div className="category-list">
          {categorySpending.map((category, index) => {
            const percentage = ((category.amount / thisMonthData.expenses) * 100).toFixed(1);
            return (
              <div key={index} className="category-item">
                <div className="category-info">
                  <div 
                    className="category-icon" 
                    style={{ backgroundColor: category.color + '20', color: category.color }}
                  >
                    {category.icon}
                  </div>
                  <div className="category-details">
                    <h4>{category.name}</h4>
                    <p>{percentage}% of total spending</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: '700', color: '#1e293b' }}>
                    {formatCurrency(category.amount)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    {percentage}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
