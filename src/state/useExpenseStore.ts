import { useState, createContext, useContext } from "react";
import { Transaction, Category } from "../models/types";
import { seedTransactions, seedCategories } from "../utils/seedData";

interface ExpenseStoreContextType {
  transactions: Transaction[];
  categories: Category[];
  addTransaction: (txn: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, txn: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

const ExpenseStoreContext = createContext<ExpenseStoreContextType | null>(null);

export function ExpenseStoreProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(seedTransactions);
  const [categories] = useState<Category[]>(seedCategories);

  const addTransaction = (txn: Omit<Transaction, "id">) => {
    const newId = `txn-${Date.now()}`;
    setTransactions([...transactions, { ...txn, id: newId }]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(transactions.map((txn) => (txn.id === id ? { ...txn, ...updates } : txn)));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((txn) => txn.id !== id));
  };

  return (
    <ExpenseStoreContext.Provider value={{ transactions, categories, addTransaction, updateTransaction, deleteTransaction }}>
      {children}
    </ExpenseStoreContext.Provider>
  );
}

export function useExpenseStore() {
  const context = useContext(ExpenseStoreContext);
  if (!context) throw new Error("useExpenseStore must be used within ExpenseStoreProvider");
  return context;
}