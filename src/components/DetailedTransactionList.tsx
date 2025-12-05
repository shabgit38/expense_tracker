import React, { useState } from "react";
import { useExpenseStore } from "../state/useExpenseStore";
import { Transaction } from "../models/types";
import { TransactionForm } from "./TransactionForm";
import "./styles/DetailedTransactionList.css";

export function DetailedTransactionList() {
  const { transactions, categories, deleteTransaction } = useExpenseStore();
  const [activeTab, setActiveTab] = useState<"Expense" | "Income">("Expense");
  const [editingId, setEditingId] = useState<string | null>(null);

  const getCategoryName = (categoryId: string): string => {
    return categories.find((c) => c.id === categoryId)?.name || "Unknown";
  };

  const filteredTransactions = transactions
    .filter((txn: Transaction) => txn.type === activeTab)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="detailed-transaction-list">
      <div className="list-header">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === "Expense" ? "active" : ""}`}
            onClick={() => setActiveTab("Expense")}
          >
            Expenses
          </button>
          <button
            className={`tab-btn ${activeTab === "Income" ? "active" : ""}`}
            onClick={() => setActiveTab("Income")}
          >
            Income
          </button>
        </div>
      </div>

      <TransactionForm
        editingId={editingId || undefined}
        onSubmit={() => setEditingId(null)}
      />

      <div className="table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn: Transaction) => (
                <tr key={txn.id}>
                  <td className="month-cell">{txn.month}</td>
                  <td className="date-cell">{txn.date}</td>
                  <td className="amount-cell">
                    ₹{txn.amount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="description-cell">{txn.description}</td>
                  <td className="category-cell">{getCategoryName(txn.categoryId)}</td>
                  <td className="actions-cell">
                    <button
                      className="btn-edit"
                      onClick={() => setEditingId(txn.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteTransaction(txn.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="empty-state">
                  No {activeTab.toLowerCase()} transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
