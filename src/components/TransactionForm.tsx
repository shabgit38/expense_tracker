import { useState } from "react";
import { useExpenseStore } from "../state/useExpenseStore";

export function TransactionForm({ editingId, onSubmit }: { editingId?: string; onSubmit?: () => void }) {
  const { transactions, categories, addTransaction, updateTransaction } = useExpenseStore();
  const editingTxn = editingId ? transactions.find((t) => t.id === editingId) : null;

  const [formData, setFormData] = useState({
    date: editingTxn?.date || new Date().toISOString().split("T")[0],
    amount: editingTxn?.amount || "",
    description: editingTxn?.description || "",
    categoryId: editingTxn?.categoryId || "cat-1",
    type: editingTxn?.type || ("Expense" as const),
    tags: editingTxn?.tags || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const month = formData.date.substring(0, 7);

    if (editingId) {
      updateTransaction(editingId, { ...formData, amount: Number(formData.amount), month });
    } else {
      addTransaction({ date: formData.date, month, amount: Number(formData.amount), description: formData.description, categoryId: formData.categoryId, type: formData.type, tags: formData.tags });
    }

    setFormData({ date: new Date().toISOString().split("T")[0], amount: "", description: "", categoryId: "cat-1", type: "Expense", tags: [] });
    onSubmit?.();
  };

  const expenseCategories = categories.filter((c) => c.type === formData.type && c.isActive);

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as "Expense" | "Income", categoryId: "" })}>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })} required>
            <option value="">Select Category</option>
            {expenseCategories.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
          </select>
        </div>
        <div className="form-group">
          <label>Amount (₹)</label>
          <input type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Description</label>
          <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Tags</label>
          <div className="tag-inputs">
            {["recurring", "sudden"].map((tag) => (
              <label key={tag} className="checkbox">
                <input type="checkbox" checked={formData.tags.includes(tag)} onChange={(e) => setFormData({ ...formData, tags: e.target.checked ? [...formData.tags, tag] : formData.tags.filter((t) => t !== tag) })} />
                {tag}
              </label>
            ))}
          </div>
        </div>
      </div>
      <button type="submit" className="btn-submit">{editingId ? "Update" : "Add Transaction"}</button>
    </form>
  );
}