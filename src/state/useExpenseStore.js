import { jsx as _jsx } from "react/jsx-runtime";
import { useState, createContext, useContext } from "react";
import { seedTransactions, seedCategories } from "../utils/seedData";
const ExpenseStoreContext = createContext(null);
export function ExpenseStoreProvider({ children }) {
    const [transactions, setTransactions] = useState(seedTransactions);
    const [categories] = useState(seedCategories);
    const addTransaction = (txn) => {
        const newId = `txn-${Date.now()}`;
        setTransactions([...transactions, { ...txn, id: newId }]);
    };
    const updateTransaction = (id, updates) => {
        setTransactions(transactions.map((txn) => (txn.id === id ? { ...txn, ...updates } : txn)));
    };
    const deleteTransaction = (id) => {
        setTransactions(transactions.filter((txn) => txn.id !== id));
    };
    const storeValue = {
        transactions,
        categories,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    };
    return (_jsx(ExpenseStoreContext.Provider, { value: storeValue, children: children }));
}
export function useExpenseStore() {
    const context = useContext(ExpenseStoreContext);
    if (!context)
        throw new Error("useExpenseStore must be used within ExpenseStoreProvider");
    return context;
}
