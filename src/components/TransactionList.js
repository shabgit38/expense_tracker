import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useExpenseStore } from "../state/useExpenseStore";
import { TransactionForm } from "./TransactionForm";
export function TransactionList() {
    const { transactions, categories, deleteTransaction } = useExpenseStore();
    const [editingId, setEditingId] = useState(null);
    const getCategoryName = (categoryId) => {
        return categories.find((c) => c.id === categoryId)?.name || "Unknown";
    };
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return (_jsxs("div", { className: "transaction-list-container", children: [_jsx("h2", { children: "Transaction Log" }), _jsx(TransactionForm, { editingId: editingId || undefined, onSubmit: () => setEditingId(null) }), _jsxs("table", { className: "transaction-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Date" }), _jsx("th", { children: "Month" }), _jsx("th", { children: "Amount (\u20B9)" }), _jsx("th", { children: "Description" }), _jsx("th", { children: "Category" }), _jsx("th", { children: "Type" }), _jsx("th", { children: "Tags" }), _jsx("th", { children: "Actions" })] }) }), _jsx("tbody", { children: sortedTransactions.map((txn) => (_jsxs("tr", { children: [_jsx("td", { children: txn.date }), _jsx("td", { children: txn.month }), _jsxs("td", { className: txn.type === "Income" ? "amount-positive" : "amount-negative", children: [txn.type === "Income" ? "+" : "-", "\u20B9", txn.amount.toFixed(2)] }), _jsx("td", { children: txn.description }), _jsx("td", { children: getCategoryName(txn.categoryId) }), _jsx("td", { className: `type-badge type-${txn.type.toLowerCase()}`, children: txn.type }), _jsx("td", { className: "tags-cell", children: txn.tags.map((tag) => (_jsx("span", { className: "tag", children: tag }, tag))) }), _jsxs("td", { className: "actions-cell", children: [_jsx("button", { className: "btn-edit", onClick: () => setEditingId(txn.id), children: "Edit" }), _jsx("button", { className: "btn-delete", onClick: () => deleteTransaction(txn.id), children: "Delete" })] })] }, txn.id))) })] })] }));
}
