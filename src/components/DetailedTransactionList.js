import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useExpenseStore } from "../state/useExpenseStore";
import { TransactionForm } from "./TransactionForm";
import "./styles/DetailedTransactionList.css";
export function DetailedTransactionList() {
    const { transactions, categories, deleteTransaction } = useExpenseStore();
    const [activeTab, setActiveTab] = useState("Expense");
    const [editingId, setEditingId] = useState(null);
    const getCategoryName = (categoryId) => {
        return categories.find((c) => c.id === categoryId)?.name || "Unknown";
    };
    const filteredTransactions = transactions
        .filter((txn) => txn.type === activeTab)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return (_jsxs("div", { className: "detailed-transaction-list", children: [_jsx("div", { className: "list-header", children: _jsxs("div", { className: "tab-buttons", children: [_jsx("button", { className: `tab-btn ${activeTab === "Expense" ? "active" : ""}`, onClick: () => setActiveTab("Expense"), children: "Expenses" }), _jsx("button", { className: `tab-btn ${activeTab === "Income" ? "active" : ""}`, onClick: () => setActiveTab("Income"), children: "Income" })] }) }), _jsx(TransactionForm, { editingId: editingId || undefined, onSubmit: () => setEditingId(null) }), _jsx("div", { className: "table-wrapper", children: _jsxs("table", { className: "transaction-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Month" }), _jsx("th", { children: "Date" }), _jsx("th", { children: "Amount" }), _jsx("th", { children: "Description" }), _jsx("th", { children: "Category" }), _jsx("th", { className: "actions-header", children: "Actions" })] }) }), _jsx("tbody", { children: filteredTransactions.length > 0 ? (filteredTransactions.map((txn) => (_jsxs("tr", { children: [_jsx("td", { className: "month-cell", children: txn.month }), _jsx("td", { className: "date-cell", children: txn.date }), _jsxs("td", { className: "amount-cell", children: ["\u20B9", txn.amount.toLocaleString("en-IN", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })] }), _jsx("td", { className: "description-cell", children: txn.description }), _jsx("td", { className: "category-cell", children: getCategoryName(txn.categoryId) }), _jsxs("td", { className: "actions-cell", children: [_jsx("button", { className: "btn-edit", onClick: () => setEditingId(txn.id), children: "Edit" }), _jsx("button", { className: "btn-delete", onClick: () => deleteTransaction(txn.id), children: "Delete" })] })] }, txn.id)))) : (_jsx("tr", { children: _jsxs("td", { colSpan: 6, className: "empty-state", children: ["No ", activeTab.toLowerCase(), " transactions found"] }) })) })] }) })] }));
}
