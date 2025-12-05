import { useState } from "react";
import { useExpenseStore } from "../state/useExpenseStore";
import { TransactionForm } from "./TransactionForm";

export function TransactionList() {
  const { transactions, categories, deleteTransaction } = useExpenseStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  const getCategoryName = (categoryId: string): string => {
    return categories.find((c) => c.id === categoryId)?.name || "Unknown";
  };

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="transaction-list-container">
      <h2>Transaction Log</h2>
      <TransactionForm editingId={editingId || undefined} onSubmit={() => setEditingId(null)} />
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Date</th><th>Month</th><th>Amount (₹)</th><th>Description</th><th>Category</th><th>Type</th><th>Tags</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.date}</td><td>{txn.month}</td>
              <td className={txn.type === "Income" ? "amount-positive" : "amount-negative"}>{txn.type === "Income" ? "+" : "-"}₹{txn.amount.toFixed(2)}</td>
              <td>{txn.description}</td><td>{getCategoryName(txn.categoryId)}</td>
              <td className={`type-badge type-${txn.type.toLowerCase()}`}>{txn.type}</td>
              <td className="tags-cell">{txn.tags.map((tag) => (<span key={tag} className="tag">{tag}</span>))}</td>
              <td className="actions-cell">
                <button className="btn-edit" onClick={() => setEditingId(txn.id)}>Edit</button>
                <button className="btn-delete" onClick={() => deleteTransaction(txn.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}