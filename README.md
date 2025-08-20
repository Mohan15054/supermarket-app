# 💰 Expense Tracker Application

A comprehensive expense tracking application built with **Next.js 15** and **React 19**. Track your spending, manage wallets, monitor accounts, and gain insights into your financial habits.

## 🚀 Features

### 📊 **Dashboard**
- **Financial Overview**: Current balance, monthly income/expenses, and savings
- **Top Spending Categories**: Visual breakdown with progress bars
- **Recent Transactions**: Latest 5 transactions with category icons
- **Quick Stats Cards**: Color-coded financial metrics

### 💰 **Expenses**
- **Monthly Summary**: Total spent and top 3 categories
- **Expense List**: All expenses with category, wallet, and date
- **Add/Edit Form**: Comprehensive form with amount, category, wallet, date, and notes
- **Action Buttons**: Edit and delete functionality for each expense

### 👛 **Wallets**
- **Total Balance Overview**: Sum of all wallet balances
- **Wallet Cards**: Visual cards with balance, icon, and color coding
- **Wallet Management**: Add, edit, and delete wallets
- **Money Transfer**: Transfer funds between wallets

### 📈 **Summary**
- **Income vs Expenses**: Monthly comparison cards
- **Weekly Trends**: Bar chart showing weekly spending patterns
- **Daily Heatmap**: Calendar view with spending intensity
- **Category Breakdown**: Detailed percentage and amount breakdown

### 👤 **Accounts**
- **Net Worth Tracking**: Assets, liabilities, and net worth calculation
- **Account Management**: Bank accounts, credit cards, loans, and investments
- **Account Types**: Support for various financial account types
- **Balance Monitoring**: Track positive and negative balances

### ⚙️ **Settings**
- **Profile Management**: Name, email, currency, and timezone
- **Category Management**: Add, edit, and delete expense/income categories
- **Notifications**: Toggle for reminders, budget alerts, and transaction alerts
- **Security**: PIN protection and biometric authentication options
- **Theme Selection**: Light and dark mode support
- **Data Management**: Export, import, and clear data functionality

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19
- **Styling**: CSS Modules + Global CSS
- **Data Storage**: JSON file (easily convertible to API)
- **Icons**: Unicode emojis for universal compatibility
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── dashboard/               # Dashboard module
│   ├── expenses/                # Expenses management
│   ├── wallets/                 # Wallet management
│   ├── summary/                 # Financial insights
│   ├── accounts/                # Account tracking
│   ├── settings/                # App settings
│   ├── globals.css              # Global styles
│   ├── layout.js                # Root layout with sidebar
│   └── page.js                  # Home page
├── components/                   # Reusable components
│   ├── Side_bar.js              # Navigation sidebar
│   └── Side_bar.css             # Sidebar styles
└── data/                        # Data layer
    ├── mockData.json            # Sample data structure
    └── dataUtils.js             # Data access utilities
```

## 🎨 Design Features

### Color Coding
- **Green**: Income and positive values
- **Red**: Expenses and negative values
- **Blue**: Balance and neutral values
- **Purple**: Savings and special metrics

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Tablet support**: Adapts to medium screen sizes
- **Desktop ready**: Full-featured desktop experience

### User Experience
- **Consistent Navigation**: Sidebar with icons and labels
- **Quick Actions**: Floating action buttons for common tasks
- **Modal Forms**: Non-intrusive add/edit experiences
- **Visual Feedback**: Hover effects and transitions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd supermarket-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload on file changes

### Build for Production

```bash
npm run build
npm start
```

## 📊 Data Structure

The application uses a JSON-based data structure that can easily be converted to API calls:

### Core Entities
- **Users**: Profile information and preferences
- **Accounts**: Financial accounts (bank, credit, loans)
- **Wallets**: Payment methods (cash, cards, digital)
- **Categories**: Expense and income categorization
- **Transactions**: Individual financial transactions
- **Budgets**: Spending limits and tracking
- **Settings**: App configuration and preferences

### Sample Data
The app includes comprehensive sample data to demonstrate all features:
- 8 transactions across different categories
- 3 wallets with varying balances
- 3 accounts including assets and liabilities
- 8 categories for income and expenses
- User preferences and settings

## 🔄 Converting to API

To convert from JSON to API-based data:

1. **Replace JSON imports** in `dataUtils.js` with API calls
2. **Update data functions** to use fetch/axios
3. **Add loading states** to components
4. **Implement error handling** for network requests
5. **Add data mutations** for create/update/delete operations

Example conversion:
```javascript
// Current: JSON-based
const getTransactions = () => mockData.transactions;

// Future: API-based
const getTransactions = async () => {
  const response = await fetch('/api/transactions');
  return response.json();
};
```

## 🎯 Future Enhancements

### Planned Features
- **Charts and Graphs**: Interactive spending charts
- **Budget Planning**: Set and track spending limits
- **Bill Reminders**: Recurring payment notifications
- **Receipt Scanning**: OCR-based expense entry
- **Multi-currency Support**: Handle multiple currencies
- **Data Export**: PDF reports and CSV exports
- **Goal Tracking**: Savings and spending goals

### Technical Improvements
- **Database Integration**: PostgreSQL or MongoDB
- **Authentication**: User login and multi-user support
- **Real-time Sync**: WebSocket-based updates
- **Mobile App**: React Native companion
- **API Documentation**: OpenAPI/Swagger specs
- **Testing Suite**: Unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Next.js and React
- Icons from Unicode emoji set
- Design inspired by modern fintech applications
- Sample data represents realistic financial scenarios

---

**Start tracking your expenses today!** 🚀


## deploy:

npm run build
git add .
git commit -m "Your update message"
git subtree push --prefix out origin gh-pages