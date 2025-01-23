// Імпортуємо функції з модуля expense-service.js
import {
    addExpense,
    deleteExpense,
    updateExpense,
    subscribeToExpenses
} from './expense-service.js';

// DOM Elements
const accountItems = document.querySelectorAll('.account-card');
const expenseItems = document.querySelectorAll('.expense-card');
const modal = document.getElementById('expenseModal');
let draggedAccount = null;
let targetExpense = null;

// Підписуємось на оновлення витрат
subscribeToExpenses((expenses) => {
    console.log('Expenses updated:', expenses);
});

// Ініціалізуємо drag and drop для рахунків
accountItems.forEach(item => {
    item.addEventListener('dragstart', e => {
        draggedAccount = item;
        item.classList.add('dragging');
    });

    item.addEventListener('dragend', e => {
        item.classList.remove('dragging');
    });
});

// Ініціалізуємо drop targets для витрат
expenseItems.forEach(item => {
    item.addEventListener('dragover', e => {
        e.preventDefault();
        item.classList.add('drop-target');
    });

    item.addEventListener('dragleave', e => {
        item.classList.remove('drop-target');
    });

    item.addEventListener('drop', e => {
        e.preventDefault();
        item.classList.remove('drop-target');
        if (draggedAccount) {
            targetExpense = item;
            openModal();
        }
    });
});

// Підримка тач-евентів для мобільних пристроїв
accountItems.forEach(item => {
    item.addEventListener('touchstart', e => {
        draggedAccount = item;
        item.classList.add('dragging');
    });

    item.addEventListener('touchend', e => {
        item.classList.remove('dragging');
        const touch = e.changedTouches[0];
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        const expenseCard = dropTarget.closest('.expense-card');

        if (expenseCard) {
            targetExpense = expenseCard;
            openModal();
        }
    });
});

// Модальне вікно
function openModal() {
    modal.classList.add('is-active');
    document.getElementById('expenseAmount').focus();
}

function closeModal() {
    modal.classList.remove('is-active');
    document.getElementById('expenseAmount').value = '';
    draggedAccount = null;
    targetExpense = null;
}

// Менеджмент витрат
async function confirmExpense() {
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    const accountBalance = parseFloat(draggedAccount.dataset.balance);
    if (amount > accountBalance) {
        alert('Insufficient funds in the account');
        return;
    }

    // Оновлюємо баланс рахунку
    const newBalance = accountBalance - amount;
    draggedAccount.dataset.balance = newBalance;
    draggedAccount.querySelector('.subtitle').textContent = `$${newBalance}`;

    // Додаємо витрати до Firestore
    const fromAccount = draggedAccount.querySelector('.title').textContent;
    const category = targetExpense.querySelector('.title').textContent;
    const expenseId = await addExpense(amount, category, fromAccount);

    if (!expenseId) {
        alert('Failed to save expense');
        return;
    }

    updateTotals();
    closeModal();
}

async function deleteTransaction(button) {
    const transaction = button.closest('.notification');
    const expenseId = transaction.dataset.expenseId;
    const amount = parseFloat(transaction.dataset.amount);

    // Delete from Firestore
    if (expenseId) {
        const success = await deleteExpense(expenseId);
        if (!success) {
            alert('Failed to delete expense');
            return;
        }
    }

    // Restore account balance
    const accountCard = Array.from(accountItems).find(item =>
        item.querySelector('.title').textContent === transaction.dataset.from
    );
    const currentBalance = parseFloat(accountCard.dataset.balance);
    accountCard.dataset.balance = currentBalance + amount;
    accountCard.querySelector('.subtitle').textContent = `$${currentBalance + amount}`;

    updateTotals();
}

function editTransaction(button) {
    const transaction = button.closest('.notification');
    const amountSpan = transaction.querySelector('.transaction-amount');
    const currentAmount = parseFloat(transaction.dataset.amount);

    const editContainer = document.createElement('div');
    editContainer.className = 'field has-addons';
    editContainer.innerHTML = `
        <div class="control">
            <input class="input is-small edit-amount-input" type="number" value="${currentAmount}">
        </div>
        <div class="control">
            <button class="button is-small is-success" onclick="saveEdit(this)">
                <span class="icon is-small">
                    <i class="fas fa-check"></i>
                </span>
            </button>
        </div>
        <div class="control">
            <button class="button is-small is-danger" onclick="cancelEdit(this)">
                <span class="icon is-small">
                    <i class="fas fa-times"></i>
                </span>
            </button>
        </div>
    `;

    amountSpan.replaceWith(editContainer);
    button.closest('.transaction-actions').style.display = 'none';
}

async function saveEdit(button) {
    const transaction = button.closest('.notification');
    const newAmount = parseFloat(button.closest('.field').querySelector('input').value);
    const oldAmount = parseFloat(transaction.dataset.amount);
    const expenseId = transaction.dataset.expenseId;

    if (isNaN(newAmount) || newAmount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    // Оновлюємо дані в Firestore
    if (expenseId) {
        const success = await updateExpense(expenseId, newAmount);
        if (!success) {
            alert('Failed to update expense');
            return;
        }
    }

    // Update account balance
    const accountCard = Array.from(accountItems).find(item =>
        item.querySelector('.title').textContent === transaction.dataset.from
    );
    const currentBalance = parseFloat(accountCard.dataset.balance);
    const newBalance = currentBalance + oldAmount - newAmount;
    accountCard.dataset.balance = newBalance;
    accountCard.querySelector('.subtitle').textContent = `$${newBalance}`;

    // Update transaction display
    transaction.dataset.amount = newAmount;
    const editContainer = button.closest('.field');
    const amountSpan = document.createElement('span');
    amountSpan.className = 'transaction-amount';
    amountSpan.textContent = `$${newAmount}`;
    editContainer.replaceWith(amountSpan);
    transaction.querySelector('.transaction-actions').style.display = 'flex';

    updateTotals();
}

function cancelEdit(button) {
    const transaction = button.closest('.notification');
    const editContainer = button.closest('.field');
    const amountSpan = document.createElement('span');
    amountSpan.className = 'transaction-amount';
    amountSpan.textContent = `$${transaction.dataset.amount}`;
    editContainer.replaceWith(amountSpan);
    transaction.querySelector('.transaction-actions').style.display = 'flex';
}

// Оновлюємо загальні показники
function updateTotals() {
    // Оновлюємо витрати
    let totalExpenses = 0;
    expenseItems.forEach(item => {
        const amount = parseFloat(item.querySelector('.subtitle').textContent.replace('$', '')) || 0;
        totalExpenses += Number(amount);
    });
    document.getElementById('totalExpenses').textContent = `$${totalExpenses}`;

    // Оновлюємо баланс
    let totalBalance = 0;
    accountItems.forEach(item => {
        const balance = parseFloat(item.dataset.balance) || 0;
        totalBalance += balance;
    });
    document.getElementById('totalBalance').textContent = `$${totalBalance}`;
}

// Нвігація
document.addEventListener('DOMContentLoaded', () => {
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');

    navbarBurger.addEventListener('click', () => {
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
    });
});

// Додаємо функції до глоабльного об'єкту window
window.openModal = openModal;
window.closeModal = closeModal;
window.confirmExpense = confirmExpense;
window.editTransaction = editTransaction;
window.deleteTransaction = deleteTransaction;
window.saveEdit = saveEdit;
window.cancelEdit = cancelEdit;
