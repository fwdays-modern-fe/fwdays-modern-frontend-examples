// expense-service.js
import {
    collection,
    doc,
    query,
    onSnapshot,
    deleteDoc,
    setDoc,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { db } from './db.js';

// Збереження даних про витрати
let expenses = [];
let subscribers = [];

// Підписка на зміни стейту
export const subscribeToExpenses = (callback) => {
    subscribers.push(callback);
    return () => {
        subscribers = subscribers.filter(sub => sub !== callback);
    };
};

// Співповіщення підписників
const notifySubscribers = () => {
    subscribers.forEach(callback => callback(expenses));
    updateUI();
};

// Ініціалізація Firestore
const initializeFirestore = () => {
    const q = query(collection(db, "expenses"));

    return onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            const expenseData = { ...change.doc.data(), id: change.doc.id };
            
            if (change.type === "added") {
                expenses.push(expenseData);
            } else if (change.type === "modified") {
                const index = expenses.findIndex(expense => expense.id === expenseData.id);
                expenses[index] = expenseData;
            } else if (change.type === "removed") {
                expenses = expenses.filter(expense => expense.id !== expenseData.id);
            }
        });

        notifySubscribers();
    });
};

// Додаємо витрату
export const addExpense = async (amount, category, fromAccount) => {
    try {
        const expense = {
            amount: parseFloat(amount),
            category,
            currency: "USD",
            timestamp: new Date().toISOString(),
            fromAccount
        };
        const docRef = await addDoc(collection(db, "expenses"), expense);
        return docRef.id;
    } catch (error) {
        console.error("Error adding expense:", error);
        return null;
    }
};

// Видаляємо витрату
export const deleteExpense = async (expenseId) => {
    try {
        await deleteDoc(doc(db, "expenses", expenseId));
        return true;
    } catch (error) {
        console.error("Error deleting expense:", error);
        return false;
    }
};

// Змінюємо витрату
export const updateExpense = async (expenseId, newAmount) => {
    try {
        const expenseRef = doc(db, "expenses", expenseId);
        const expense = expenses.find(e => e.id === expenseId);
        if (!expense) return false;

        await setDoc(expenseRef, {
            ...expense,
            amount: parseFloat(newAmount)
        }, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating expense:", error);
        return false;
    }
};

// Отримуємо усі витрати
export const getExpenses = () => [...expenses];

// Групуємо витрати по категоріям
export const groupExpensesByCategory = () => {
    return expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = [];
        }
        acc[expense.category].push(expense);
        return acc;
    }, {});
};

// Функції для оновлення інтерфейсу
const updateUI = () => {
    updateExpenseCategories();
    updateTotalExpenses();
    updateTransactionHistory();
};

const updateExpenseCategories = () => {
    const expensesByCategory = groupExpensesByCategory();
    Object.entries(expensesByCategory).forEach(([category, categoryExpenses]) => {
        const totalAmount = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        const categoryCard = document.querySelector(`.expense-card[data-category="${category.toLowerCase()}"]`);
        if (categoryCard) {
            categoryCard.querySelector('.subtitle').textContent = `$${totalAmount}`;
        }
    });
};

const updateTotalExpenses = () => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalExpenses').textContent = `$${totalExpenses}`;

    new Notification('Expenses', { body: `Expenses notification` });
    //Відправляємо foreground сповіщення
    // setTimeout(() => {
    //     new Notification('Expenses', { body: `Expenses notification` });
    // }, 3000);
};

const updateTransactionHistory = () => {
    const transactionList = document.getElementById('transactionList');
    if (!transactionList) return;
    
    transactionList.innerHTML = '';

    const sortedExpenses = [...expenses].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    sortedExpenses.forEach(expense => {
        const transaction = document.createElement('div');
        transaction.className = 'notification is-light is-info mb-2';
        transaction.dataset.expenseId = expense.id;
        transaction.dataset.amount = expense.amount;
        transaction.dataset.from = expense.fromAccount;
        transaction.dataset.to = expense.category;

        transaction.innerHTML = `
            <div class="level is-mobile">
                <div class="level-left">
                    <div class="level-item">
                        ${expense.fromAccount} → ${expense.category}
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <span class="transaction-amount">$${expense.amount}</span>
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

        transactionList.appendChild(transaction);
    });
};

// Ініціалізація сервісу
initializeFirestore();