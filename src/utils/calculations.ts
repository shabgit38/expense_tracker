import { Transaction, Category, MonthlyTotals } from "../models/types";

export function getCategoryMonthTotal(transactions: Transaction[], categoryId: string, month: string): number {
  return transactions.filter((txn) => txn.categoryId === categoryId && txn.month === month)
    .reduce((sum, txn) => sum + txn.amount, 0);
}

export function getMonthlyTotals(transactions: Transaction[], month: string): MonthlyTotals {
  const monthTransactions = transactions.filter((txn) => txn.month === month);
  const totalExpenses = monthTransactions.filter((txn) => txn.type === "Expense")
    .reduce((sum, txn) => sum + txn.amount, 0);
  const totalIncome = monthTransactions.filter((txn) => txn.type === "Income")
    .reduce((sum, txn) => sum + txn.amount, 0);
  return { month, totalExpenses, totalIncome, net: totalIncome - totalExpenses };
}

export function getAllMonths(transactions: Transaction[]): string[] {
  const months = new Set(transactions.map((txn) => txn.month));
  return Array.from(months).sort().reverse();
}

export function getCategoriesByType(categories: Category[], type: "Expense" | "Income"): Category[] {
  return categories.filter((cat) => cat.type === type && cat.isActive);
}