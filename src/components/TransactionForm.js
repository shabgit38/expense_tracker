import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useExpenseStore } from "../state/useExpenseStore";
export function TransactionForm({ editingId, onSubmit }) {
    const { transactions, categories, addTransaction, updateTransaction } = useExpenseStore();
    const editingTxn = editingId ? transactions.find((t) => t.id === editingId) : null;
    const [formData, setFormData] = useState({
        date: editingTxn?.date || new Date().toISOString().split("T")[0],
        amount: editingTxn?.amount || "",
        description: editingTxn?.description || "",
        categoryId: editingTxn?.categoryId || "cat-1",
        type: editingTxn?.type || "Expense",
        tags: editingTxn?.tags || [],
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const month = formData.date.substring(0, 7);
        if (editingId) {
            updateTransaction(editingId, { ...formData, amount: Number(formData.amount), month });
        }
        else {
            addTransaction({ date: formData.date, month, amount: Number(formData.amount), description: formData.description, categoryId: formData.categoryId, type: formData.type, tags: formData.tags });
        }
        setFormData({ date: new Date().toISOString().split("T")[0], amount: "", description: "", categoryId: "cat-1", type: "Expense", tags: [] });
        onSubmit?.();
    };
    const expenseCategories = categories.filter((c) => c.type === formData.type && c.isActive);
    return (_jsxs("form", { className: "transaction-form", onSubmit: handleSubmit, children: [_jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Date" }), _jsx("input", { type: "date", value: formData.date, onChange: (e) => setFormData({ ...formData, date: e.target.value }), required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Type" }), _jsxs("select", { value: formData.type, onChange: (e) => setFormData({ ...formData, type: e.target.value, categoryId: "" }), children: [_jsx("option", { value: "Expense", children: "Expense" }), _jsx("option", { value: "Income", children: "Income" })] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Category" }), _jsxs("select", { value: formData.categoryId, onChange: (e) => setFormData({ ...formData, categoryId: e.target.value }), required: true, children: [_jsx("option", { value: "", children: "Select Category" }), expenseCategories.map((cat) => (_jsx("option", { value: cat.id, children: cat.name }, cat.id)))] })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Amount (\u20B9)" }), _jsx("input", { type: "number", step: "0.01", value: formData.amount, onChange: (e) => setFormData({ ...formData, amount: e.target.value }), required: true })] })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Description" }), _jsx("input", { type: "text", value: formData.description, onChange: (e) => setFormData({ ...formData, description: e.target.value }), required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Tags" }), _jsx("div", { className: "tag-inputs", children: ["recurring", "sudden"].map((tag) => (_jsxs("label", { className: "checkbox", children: [_jsx("input", { type: "checkbox", checked: formData.tags.includes(tag), onChange: (e) => setFormData({ ...formData, tags: e.target.checked ? [...formData.tags, tag] : formData.tags.filter((t) => t !== tag) }) }), tag] }, tag))) })] })] }), _jsx("button", { type: "submit", className: "btn-submit", children: editingId ? "Update" : "Add Transaction" })] }));
}
