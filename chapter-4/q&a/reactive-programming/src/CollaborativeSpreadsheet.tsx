import { Card } from '@/components/ui/card'
import {BehaviorSubject, interval, Subject, merge, from, debounceTime, distinctUntilChanged} from "rxjs";
import { useEffect, useState } from "react";
import { map, tap, switchMap, shareReplay } from "rxjs/operators";

// Subject інформує підписників про зміни в таблиці
const cellUpdates = new Subject();
// Subject інформує підписників про зміни в таблиці від нашого користувача
const uiEdits = new Subject();

// BehaviorSubject інформує підписників про нові значення в таблиці
const cellValues = new BehaviorSubject({});
// BehaviorSubject інформує підписників про активного користувача, що вносить зміни
const activeUsers = new BehaviorSubject({});


const cellUpdatesPiped = cellUpdates.pipe(
    // switchMap - оператор у RxJS, що перемикається на новий внутрішній observable, відміняючи попередній, якщо надходять нові значення
    switchMap(() => {
        // from обертає Promise у Observable та результат його виконання у стрім
        return from(fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => res.json()))
    }),
    tap((res) => {
        console.log('Cell update sub 1: ', res);
    }),
    // За наявності декількох підписок, результат виконаня шериться між ними, приймає парамент з розміром буферу
    shareReplay(1)
)

// Оптимізуємо результат вводу користувача
const debouncedUiEdits = uiEdits.pipe(
    // додає debounce до стріму, отрмуючи нові дані кожни 100 мс
    debounceTime(100),
    // емітить нові значення тільки якщо prev та curr відмінні, виконує strict equality
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)) //{} === {}
)



// Симулюємо зміни від інших користувачів
const simulateUserEdit = (userId, intervalMs) => {
    // Використовуємо interval з RxJS для емішену кожні intervalMs
    return interval(intervalMs).pipe(
        map(() => {
            const columns = ['A', 'B', 'C', 'D'];
            const rows = [1, 2, 3, 4];
            const randomCell = `${columns[Math.floor(Math.random() * columns.length)]}${rows[Math.floor(Math.random() * rows.length)]}`;
            const randomValue = Math.random() > 0.5 ? Math.floor(Math.random() * 100) : `=${Math.floor(Math.random() * 10)}+${Math.floor(Math.random() * 10)}`;

            // Повертаємо об'єкт cellUpdates
            return { randomCell, update: { [randomCell]: randomValue }, userId };
        }),
        // Використовуємо оператор tap для опрацювання side effects
        tap(({ randomCell, userId }) => {
            console.log(`User ${userId} edited`, randomCell);

            // Інформуємо підписників activeUsers по зміни від певного користувача з userId
            activeUsers.next({ ...activeUsers.value, [userId]: randomCell });
        }),

        // Повертаємо cellUpdates з userId
        map(({ update }) => ({
            ...update,
            userId
        }))
    );
};

// Створюємо два стріми з змінами від User1 та User2
const user1Edits = simulateUserEdit('User1', 5000)
const user2Edits = simulateUserEdit('User2', 10000)

// З допомогою оператора merge змерждимо 3 стріми в один та емітимо cellUpdates
merge(user1Edits, user2Edits, debouncedUiEdits).subscribe(update => {
    console.log('update: ', update)
    cellUpdates.next(update)
});

// Helper функція, що трансформує формулу у значення
const evaluateFormula = (formula, values) => {
    const strFormula = String(formula);
    if (!strFormula.startsWith('=')) return strFormula;

    try {
        const expression = strFormula.substring(1)
            .replace(/[A-D][1-4]/g, (cell) => {
                const value = values[cell] || '0';
                return isNaN(value) ? '0' : value;
            });
        return eval(expression).toString();
    } catch {
        return '#ERROR';
    }
};

// Комонент CollaborativeSpreadsheet
const CollaborativeSpreadsheet = () => {
    const [cells, setCells] = useState({});
    const [editingCell, setEditingCell] = useState(null);

    // Визначення колонок та рядків для таблиці розміром 4х4
    const columns = ['A', 'B', 'C', 'D']
    const rows = [1, 2, 3, 4]

    useEffect(() => {
        // Підписка на cellUpdates
        const subscription = cellUpdatesPiped.subscribe(update => {
            // Інформуємо підписників cellValues про нові значення в клітинках
            cellValues.next({ ...cellValues.value, ...update });
        });

        // Підписка на cellValues
        const valueSubscription = cellValues.subscribe(values => {
            // Перетворюємо значення з таблиці з допомогою формул
            const evaluatedCells = {};
            Object.entries(values).forEach(([cell, value]) => {
                evaluatedCells[cell] = evaluateFormula(value, values);
            });

            // Додаємо значення в state cells для відображення на UI
            setCells(evaluatedCells);
        });

        cellUpdatesPiped.subscribe(update => {
            console.log('Cell update sub 2: ', update);
        })

        // Робимо відписку пісня unmount компоненту
        return () => {
            subscription.unsubscribe();
            valueSubscription.unsubscribe();
        }
    }, [])

    // Helper функція, що іформує uiEdits subject про зміни в таблиці з UI
    const handleCellChange = (cellId, value) => {
        uiEdits.next({ [cellId]: value, userId: 'UI' });
    }

    // Helper функція, що отримує значення з input в компоненті
    const getCellContent = (cellId) => {
        if (editingCell === cellId) {
            return cellValues.value[cellId] || '';
        }
        return cells[cellId] || '';
    };

    // Helper функція для додавання на UI таблиці користувача, що вносить зміни в клітинці
    const getCellUser = (cellId) => {
        return Object.entries(activeUsers.value).find(([_, cell]) => cell === cellId)?.[0] || '';
    };

    return (
        <Card className="p-4 w-full max-w-2xl">

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr>
                        <th className="w-12 p-2 border bg-gray-100"></th>
                        {columns.map(col => (
                            <th key={col} className="w-24 p-2 border bg-gray-100 text-center">
                                {col}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map(row => (
                        <tr key={row}>
                            <td className="p-2 border bg-gray-100 text-center font-medium">
                                {row}
                            </td>
                            {columns.map(col => {
                                const cellId = `${col}${row}`;
                                return (
                                    <td key={cellId} className="p-0 border relative">
                                        <input
                                            type="text"
                                            className="w-full h-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={getCellContent(cellId)}
                                            onChange={(e) => handleCellChange(cellId, e.target.value)}
                                            onFocus={() => setEditingCell(cellId)}
                                            onBlur={() => setEditingCell(null)}
                                        />
                                        {getCellUser(cellId) && (
                                            <span className="absolute top-0 right-0 text-xs bg-yellow-200 p-1 rounded">
                                                {getCellUser(cellId)}
                                            </span>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

export default CollaborativeSpreadsheet;