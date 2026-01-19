# FinanceFlow Technical Documentation

This document provides a detailed overview of the code structure and logic implemented in the FinanceFlow Expense Tracker.

## 🏗️ Code Structure

### HTML (`index.html`)
The structure is divided into semantic sections:
- `header`: Contains the logo and branding.
- `summary-cards`: Displays the high-level financial overview.
- `dashboard-grid`: Contains the input form and the chart visualization.
- `list-section`: Displays the transaction history in a tabular format.
- `toast-container`: A placeholder for dynamic notifications.

### CSS (`style.css`)
- **Design System**: Uses CSS variables (`:root`) for colors, shadows, and spacing to ensure consistency and easy maintenance.
- **Layout**: Employs CSS Grid for the main dashboard and Flexbox for internal card layouts.
- **Animations**: Includes `@keyframes` for "slide-in" toasts and "fade-in" transaction items to enhance UX.
- **Responsiveness**: Breakpoints at `768px` handle the transition from desktop to mobile views.

### JavaScript (`script.js`)
The logic is organized into several key areas:
- **Global State**: `transactions` array holds all data.
- **Initialization**: `init()` function loads data from `localStorage` and triggers the first render.
- **Event Listeners**: Handle form submissions, deletions, and filtering.
- **Render Functions**: 
    - `renderTransactions()`: Dynamically builds the table rows.
    - `updateChart()`: Uses Chart.js to process transaction data and update the doughnut chart.
    - `calculateSummary()`: Performs arithmetic for balance, income, and expense totals.

## 🧠 Core Logic Flow

1.  **Input Validation**: Before a transaction is added, the script checks for empty descriptions, valid numbers, and dates.
2.  **Data Persistence**: Every modification (add/delete) calls `updateLocalStorage()`, which stringifies the `transactions` array into the browser's `localStorage`.
3.  **Dynamic Calculations**: 
    - Balance = Total Income - Total Expense.
    - The `Intl.NumberFormat` API is used for currency formatting ($0.00).
4.  **Chart Visualization**:
    - The script filters only 'expense' type transactions.
    - It groups these by category and sums their amounts.
    - Chart.js then maps these categories to specific colors for the doughnut chart.

## 🚀 Future Enhancements (Potential)
- **Multi-currency support**: Adding a currency selector.
- **Monthly Views**: Filtering transactions by month/year.
- **Export to CSV**: Allowing users to download their data for external use.
- **Budgeting**: Setting limits for categories and showing warnings when exceeded.
