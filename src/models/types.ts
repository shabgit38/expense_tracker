export type TransactionType = "Expense" | "Income";

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  month: string;
  amount: number;
  description: string;
  categoryId: string;
  type: TransactionType;
  tags: string[];
}

export interface MonthlyTotals {
  month: string;
  totalExpenses: number;
  totalIncome: number;
  net: number;
}