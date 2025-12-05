import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { useExpenseStore } from "../state/useExpenseStore";
import "./styles/ConsolidationView.css";
export function ConsolidationView() {
    const { transactions, categories } = useExpenseStore();
    const expenseTransactions = transactions.filter((txn) => txn.type === "Expense");
    const consolidatedData = useMemo(() => {
        const data = {};
        const months = new Set();
        expenseTransactions.forEach((txn) => {
            const categoryName = categories.find((c) => c.id === txn.categoryId)?.name || txn.categoryId;
            months.add(txn.month);
            if (!data[categoryName]) {
                data[categoryName] = {};
            }
            data[categoryName][txn.month] = (data[categoryName][txn.month] || 0) + txn.amount;
        });
        return { data, months: Array.from(months).sort() };
    }, [expenseTransactions, categories]);
    const categoryNames = Object.keys(consolidatedData.data).sort();
    const { months } = consolidatedData;
    const calculateCategoryTotal = (category) => {
        return Object.values(consolidatedData.data[category] || {}).reduce((sum, val) => sum + val, 0);
    };
    const calculateMonthTotal = (month) => {
        return categoryNames.reduce((sum, cat) => sum + (consolidatedData.data[cat][month] || 0), 0);
    };
    const grandTotal = categoryNames.reduce((sum, cat) => sum + calculateCategoryTotal(cat), 0);
    return (_jsxs("div", { className: "consolidation-view", children: [_jsx("h2", { children: "Monthly Consolidation" }), _jsx("div", { className: "table-wrapper", children: _jsxs("table", { className: "consolidation-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Category" }), months.map((month) => (_jsx("th", { children: month }, month))), _jsx("th", { className: "total-col", children: "Grand Total" })] }) }), _jsxs("tbody", { children: [categoryNames.map((category) => (_jsxs("tr", { children: [_jsx("td", { className: "category-cell", children: category }), months.map((month) => (_jsx("td", { className: "amount-cell", children: consolidatedData.data[category][month]
                                                ? `₹${consolidatedData.data[category][month].toLocaleString("en-IN", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}`
                                                : "" }, `${category}-${month}`))), _jsxs("td", { className: "amount-cell total-cell", children: ["\u20B9", calculateCategoryTotal(category).toLocaleString("en-IN", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })] })] }, category))), _jsxs("tr", { className: "total-row", children: [_jsx("td", { className: "category-cell", children: "Grand Total" }), months.map((month) => (_jsxs("td", { className: "amount-cell total-cell", children: ["\u20B9", calculateMonthTotal(month).toLocaleString("en-IN", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })] }, `total-${month}`))), _jsxs("td", { className: "amount-cell total-cell", children: ["\u20B9", grandTotal.toLocaleString("en-IN", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })] })] })] })] }) })] }));
}
