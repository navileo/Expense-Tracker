// State Management
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let chart = null;

// DOM Elements
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');

const totalBalanceEl = document.getElementById('total-balance');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const transactionListEl = document.getElementById('transaction-list');
const filterCategoryEl = document.getElementById('filter-category');
const noDataMessage = document.getElementById('no-data-message');
const toastContainer = document.getElementById('toast-container');

// Set default date to today
dateInput.valueAsDate = new Date();

// --- Core Functions ---

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function calculateSummary() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expense;

    totalBalanceEl.textContent = formatCurrency(balance);
    totalIncomeEl.textContent = formatCurrency(income);
    totalExpenseEl.textContent = formatCurrency(expense);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

function renderTransactions(filter = 'all') {
    transactionListEl.innerHTML = '';
    
    const filteredTransactions = filter === 'all' 
        ? transactions 
        : transactions.filter(t => t.category === filter);

    // Sort by date descending
    filteredTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredTransactions.length === 0) {
        transactionListEl.innerHTML = '<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 2rem;">No transactions found</td></tr>';
        return;
    }

    filteredTransactions.forEach(t => {
        const row = document.createElement('tr');
        row.className = 'transaction-item';
        row.innerHTML = `
            <td>${new Date(t.date).toLocaleDateString()}</td>
            <td>${t.description}</td>
            <td><span class="badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}">${t.category}</span></td>
            <td class="${t.type === 'income' ? 'amount-income' : 'amount-expense'}">
                ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
            </td>
            <td>
                <button class="btn-delete" onclick="deleteTransaction(${t.id})">
                    <i data-lucide="trash-2" style="width: 18px; height: 18px;"></i>
                </button>
            </td>
        `;
        transactionListEl.appendChild(row);
    });

    // Re-initialize icons for the new elements
    lucide.createIcons();
}

function updateChart() {
    const expenseData = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
        }, {});

    const categories = Object.keys(expenseData);
    const amounts = Object.values(expenseData);

    const ctx = document.getElementById('expense-chart').getContext('2d');

    if (categories.length === 0) {
        if (chart) chart.destroy();
        noDataMessage.classList.remove('hidden');
        document.getElementById('expense-chart').classList.add('hidden');
        return;
    }

    noDataMessage.classList.add('hidden');
    document.getElementById('expense-chart').classList.remove('hidden');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: amounts,
                backgroundColor: [
                    '#4f46e5', '#10b981', '#ef4444', '#f59e0b', 
                    '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
    toast.innerHTML = `
        <i data-lucide="${iconName}"></i>
        <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Event Handlers ---

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;
    const category = categoryInput.value;
    const date = dateInput.value;

    if (!description || isNaN(amount) || amount <= 0 || !date) {
        showToast('Please fill in all fields correctly', 'error');
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type,
        category,
        date
    };

    transactions.push(transaction);
    
    updateLocalStorage();
    calculateSummary();
    renderTransactions(filterCategoryEl.value);
    updateChart();
    
    // Reset form but keep date
    transactionForm.reset();
    dateInput.valueAsDate = new Date();
    
    showToast(`Transaction added successfully!`);
});

window.deleteTransaction = (id) => {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    calculateSummary();
    renderTransactions(filterCategoryEl.value);
    updateChart();
    showToast('Transaction deleted', 'success');
};

filterCategoryEl.addEventListener('change', (e) => {
    renderTransactions(e.target.value);
});

// --- Initialization ---

function init() {
    calculateSummary();
    renderTransactions();
    updateChart();
}

init();
