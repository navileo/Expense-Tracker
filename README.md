# FinanceFlow | Personal Expense Tracker

FinanceFlow is a modern, responsive web application designed to help users track their income and expenses, visualize their spending habits, and manage their personal finances with ease.
## Live Demo
    - https://navileo.github.io/Expense-Tracker/

## 🚀 Features

-   **Dashboard Summary**: Real-time calculation of Total Balance, Total Income, and Total Expenses.
-   **Transaction Management**: Easily add income or expense entries with category, date, and description.
-   **Spending Insights**: Dynamic doughnut chart visualizing expense distribution by category.
-   **Responsive Design**: Optimized for desktop, tablet, and mobile devices using CSS Grid and Flexbox.
-   **Persistence**: Data is saved to the browser's LocalStorage, ensuring your records are available when you return.
-   **Filtering**: Filter transactions by category to find specific entries quickly.
-   **Toast Notifications**: Smooth visual feedback for actions like adding or deleting transactions.

## 🛠️ Technology Stack

-   **HTML5**: Semantic structure for accessibility and SEO.
-   **CSS3**: Custom variables, Grid/Flexbox layout, and smooth animations.
-   **JavaScript (ES6+)**: Functional programming approach for state management and UI logic.
-   **Lucide Icons**: Modern, consistent iconography.
-   **Chart.js**: Interactive data visualization.

## 📂 Project Structure

-   `index.html`: The core structure of the application.
-   `style.css`: Modern styling with a clean, minimal aesthetic.
-   `script.js`: Core logic for transaction handling, calculations, and chart updates.

## 🧠 Logic & Architecture

### 1. State Management
The application maintains a `transactions` array as the single source of truth. Any change to this array triggers a series of update functions:
- `updateLocalStorage()`: Syncs the array with the browser's storage.
- `calculateSummary()`: Re-calculates totals from the array.
- `renderTransactions()`: Re-builds the transaction list table.
- `updateChart()`: Re-renders the Chart.js visualization.

### 2. UI Updates
The app uses a reactive approach. Instead of updating individual DOM elements manually after every change, the `init()` and update functions re-render sections based on the current state.

### 3. Calculations
Income and expenses are calculated using the `Array.prototype.reduce()` method for efficiency and readability.

```javascript
const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
```

### 4. Responsive Layout
Media queries are used to switch the dashboard from a two-column grid (desktop) to a single-column stack (mobile), ensuring a seamless experience across all devices.

## 📝 Usage

1.  **Add a Transaction**: Fill in the description, amount, type (Income/Expense), category, and date. Click "Add Transaction".
2.  **View Summary**: The top cards will instantly update to show your financial status.
3.  **Filter**: Use the dropdown above the transaction list to filter by category.
4.  **Delete**: Click the trash icon next to a transaction to remove it.
5.  **Insights**: Hover over the doughnut chart to see exact spending amounts per category.

## 🏁 Installation

No installation required! Simply open `index.html` in any modern web browser.

---
Built with ❤️ for better financial clarity.
