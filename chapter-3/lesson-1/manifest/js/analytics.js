// Мок дані для чарту
const spendingData = {
    labels: ['Groceries', 'Utilities', 'Transportation', 'Entertainment', 'Healthcare'],
    datasets: [{
        data: [850, 300, 450, 400, 347],
        backgroundColor: [
            '#00d1b2',
            '#3273dc',
            '#ffdd57',
            '#ff3860',
            '#209cee'
        ]
    }]
};

// Ініціалізація чарту
const ctx = document.getElementById('spendingChart').getContext('2d');
new Chart(ctx, {
    type: 'doughnut',
    data: spendingData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        },
        cutout: '60%'
    }
});

// Мок дані витрат
const expenses = [
    { category: 'Groceries', amount: 850, date: '2025-01-05', budget: 1000 },
    { category: 'Utilities', amount: 300, date: '2025-01-03', budget: 350 },
    { category: 'Transportation', amount: 450, date: '2025-01-04', budget: 500 },
    { category: 'Entertainment', amount: 400, date: '2025-01-02', budget: 400 },
    { category: 'Healthcare', amount: 347, date: '2025-01-01', budget: 400 }
];

// Талиця витрат
const tableBody = document.getElementById('expenseTableBody');
expenses.forEach(expense => {
    const row = document.createElement('tr');
    const percentOfBudget = (expense.amount / expense.budget * 100).toFixed(1);
    row.innerHTML = `
        <td>${expense.category}</td>
        <td>$${expense.amount}</td>
        <td>${expense.date}</td>
        <td>
            <progress
                class="progress ${percentOfBudget > 90 ? 'is-danger' : 'is-primary'} is-small"
                value="${percentOfBudget}"
                max="100"
            >${percentOfBudget}%</progress>
        </td>
    `;
    tableBody.appendChild(row);
});

// Навігаці на мобільних девайсах через бургер меню
document.addEventListener('DOMContentLoaded', () => {
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');

    navbarBurger.addEventListener('click', () => {
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
    });
});