import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Cloud messaging
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

const accountItems = document.querySelectorAll('.account-card');
const expenseItems = document.querySelectorAll('.expense-card');
const modal = document.getElementById('expenseModal');
let draggedAccount = null;
let targetExpense = null;



const firebaseConfig = {
    apiKey: "AIzaSyA7NmdqcNKsXKiYUSTl1GskGlLltkQVEm4",
    authDomain: "pwa-app-c08dc.firebaseapp.com",
    projectId: "pwa-app-c08dc",
    storageBucket: "pwa-app-c08dc.firebasestorage.app",
    messagingSenderId: "862404053497",
    appId: "1:862404053497:web:7979da0e348659dfe25528"
};

// Ініціюємо Firebase
export const app = initializeApp(firebaseConfig);


// Ініціюємо Firestore
export const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tebManager: persistentMultipleTabManager() //presistantSungleTabManager()
    })
});

const messaging = getMessaging();
// Add the public key generated from the console here.
getToken(messaging, { vapidKey: "BE9x_W8JqaNBcK5vwZmFbAA-WwalstbCRjeH5IBB0r44Q7Sw-3wQ5wV9cSoeVTTaBHzft0x-NGu3H8yOPzVAGAQ" })
    .then((currentToken) => {
        if (currentToken) {
            console.log(currentToken);
        } else {
            console.log('No registration token available')
        }
    })
    .catch((err) => {
        console.log('An error occurred: ', err);
    })


// Initialize drag and drop for account items
accountItems.forEach(item => {
    item.addEventListener('dragstart', e => {
        draggedAccount = item;
        item.classList.add('dragging');
    });

    item.addEventListener('dragend', e => {
        item.classList.remove('dragging');
    });
});

// Initialize drop targets for expense items
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

function confirmExpense() {
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

    // Update account balance
    const newBalance = accountBalance - amount;
    draggedAccount.dataset.balance = newBalance;
    draggedAccount.querySelector('.subtitle').textContent = `$${newBalance}`;

    // Update expense amount
    const currentExpense = parseFloat(targetExpense.querySelector('.subtitle').textContent.replace('$', '')) || 0;
    const newExpense = currentExpense + amount;
    targetExpense.querySelector('.subtitle').textContent = `$${newExpense}`;

    // Add transaction to history
    addTransaction(
        draggedAccount.querySelector('.title').textContent,
        targetExpense.querySelector('.title').textContent,
        amount
    );

    // Update total expenses
    updateTotals();
    closeModal();
}

function addTransaction(from, to, amount) {
    const transaction = document.createElement('div');
    transaction.className = 'notification is-light is-info mb-2';
    transaction.dataset.from = from;
    transaction.dataset.to = to;
    transaction.dataset.amount = amount;

    const transactionHtml = `
                <div class="level is-mobile">
                    <div class="level-left">
                        <div class="level-item">
                            ${from} → ${to}
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <span class="transaction-amount">$${amount}</span>
                            <div class="transaction-actions">
                                <button class="button is-small is-info" onclick="editTransaction(this)">
                                    <span class="icon is-small">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                </button>
                                <button class="button is-small is-danger" onclick="deleteTransaction(this)">
                                    <span class="icon is-small">
                                        <i class="fas fa-trash"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

    transaction.innerHTML = transactionHtml;
    document.getElementById('transactionList').prepend(transaction);
}

function editTransaction(button) {
    const transaction = button.closest('.notification');
    const amountSpan = transaction.querySelector('.transaction-amount');
    const currentAmount = parseFloat(transaction.dataset.amount);

    // Create edit interface
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

function saveEdit(button) {
    const transaction = button.closest('.notification');
    const newAmount = parseFloat(button.closest('.field').querySelector('input').value);
    const oldAmount = parseFloat(transaction.dataset.amount);

    if (isNaN(newAmount) || newAmount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    // Update expense category amount
    const expenseCard = Array.from(expenseItems).find(item =>
        item.querySelector('.title').textContent === transaction.dataset.to
    );
    const currentExpense = parseFloat(expenseCard.querySelector('.subtitle').textContent.replace('$', ''));
    expenseCard.querySelector('.subtitle').textContent = `$${currentExpense - oldAmount + newAmount}`;

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

function deleteTransaction(button) {
    const transaction = button.closest('.notification');
    const amount = parseFloat(transaction.dataset.amount);

    // Restore expense category amount
    const expenseCard = Array.from(expenseItems).find(item =>
        item.querySelector('.title').textContent === transaction.dataset.to
    );
    const currentExpense = parseFloat(expenseCard.querySelector('.subtitle').textContent.replace('$', ''));
    expenseCard.querySelector('.subtitle').textContent = `$${currentExpense - amount}`;

    // Restore account balance
    const accountCard = Array.from(accountItems).find(item =>
        item.querySelector('.title').textContent === transaction.dataset.from
    );
    const currentBalance = parseFloat(accountCard.dataset.balance);
    accountCard.dataset.balance = currentBalance + amount;
    accountCard.querySelector('.subtitle').textContent = `$${currentBalance + amount}`;

    // Remove transaction
    transaction.remove();
    updateTotals();
}

// Mobile touch support
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

function updateTotals() {
    // Update total expenses
    let totalExpenses = 0;
    expenseItems.forEach(item => {
        const amount = parseFloat(item.querySelector('.subtitle').textContent.replace('$', '')) || 0;
        totalExpenses += amount;
    });
    document.getElementById('totalExpenses').textContent = `$${totalExpenses}`;

    // Update total balance
    let totalBalance = 0;
    accountItems.forEach(item => {
        const balance = parseFloat(item.dataset.balance) || 0;
        totalBalance += balance;
    });
    document.getElementById('totalBalance').textContent = `$${totalBalance}`;
}

//Navigation code
document.addEventListener('DOMContentLoaded', () => {
    const navbarBurger = document.querySelector('.navbar-burger');
    const navbarMenu = document.querySelector('.navbar-menu');

    navbarBurger.addEventListener('click', () => {
        navbarBurger.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
    });
});
