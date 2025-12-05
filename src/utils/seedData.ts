import { Category, Transaction } from "../models/types";

export const seedCategories: Category[] = [
  { id: "cat-1", name: "Groceries", type: "Expense", isActive: true },
  { id: "cat-2", name: "Food Orders", type: "Expense", isActive: true },
  { id: "cat-3", name: "Internet", type: "Expense", isActive: true },
  { id: "cat-4", name: "Maintenance", type: "Expense", isActive: true },
  { id: "cat-5", name: "Transport", type: "Expense", isActive: true },
  { id: "cat-6", name: "Entertainment", type: "Expense", isActive: true },
  { id: "cat-101", name: "Salary", type: "Income", isActive: true },
  { id: "cat-102", name: "Mutual Funds", type: "Income", isActive: true },
  { id: "cat-103", name: "Dividends", type: "Income", isActive: true },
];

export const seedTransactions: Transaction[] = [
  { id: "txn-1", date: "2024-10-01", month: "2024-10", amount: 5000, description: "October Salary", categoryId: "cat-101", type: "Income", tags: ["recurring"] },
  { id: "txn-2", date: "2024-10-02", month: "2024-10", amount: 1200, description: "Weekly groceries", categoryId: "cat-1", type: "Expense", tags: ["recurring"] },
  { id: "txn-3", date: "2024-10-05", month: "2024-10", amount: 350, description: "Zomato dinner", categoryId: "cat-2", type: "Expense", tags: [] },
  { id: "txn-4", date: "2024-10-07", month: "2024-10", amount: 800, description: "Internet bill", categoryId: "cat-3", type: "Expense", tags: ["recurring"] },
  { id: "txn-5", date: "2024-10-12", month: "2024-10", amount: 2000, description: "MF Dividend", categoryId: "cat-103", type: "Income", tags: ["recurring"] },
  { id: "txn-6", date: "2024-11-01", month: "2024-11", amount: 5000, description: "November Salary", categoryId: "cat-101", type: "Income", tags: ["recurring"] },
  { id: "txn-7", date: "2024-11-02", month: "2024-11", amount: 1300, description: "Groceries", categoryId: "cat-1", type: "Expense", tags: ["recurring"] },
  { id: "txn-8", date: "2024-11-10", month: "2024-11", amount: 2500, description: "AC Maintenance", categoryId: "cat-4", type: "Expense", tags: ["sudden"] },
  { id: "txn-9", date: "2024-12-01", month: "2024-12", amount: 5000, description: "December Salary", categoryId: "cat-101", type: "Income", tags: ["recurring"] },
  { id: "txn-10", date: "2024-12-05", month: "2024-12", amount: 420, description: "Swiggy lunch", categoryId: "cat-2", type: "Expense", tags: [] },
];