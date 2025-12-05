import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useExpenseStore } from "../state/useExpenseStore";
import { getCategoryMonthTotal, getMonthlyTotals, getAllMonths, getCategoriesByType } from "../utils/calculations";
export function MonthlySummary() {
    const { transactions, categories } = useExpenseStore();
    const allMonths = getAllMonths(transactions);
    const expenseCategories = getCategoriesByType(categories, "Expense");
    const incomeCategories = getCategoriesByType(categories, "Income");
    return (_jsxs("div", { className: "monthly-summary-container", children: [_jsx("h2", { children: "Monthly Summary" }), _jsxs("section", { className: "summary-section", children: [_jsx("h3", { children: "Expenses by Category" }), _jsxs("table", { className: "summary-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Category" }), allMonths.map((month) => (_jsx("th", { children: month }, month))), _jsx("th", { children: "Total" })] }) }), _jsxs("tbody", { children: [expenseCategories.map((cat) => {
                                        const rowTotal = allMonths.reduce((sum, month) => sum + getCategoryMonthTotal(transactions, cat.id, month), 0);
                                        return (_jsxs("tr", { children: [_jsx("td", { className: "category-name", children: cat.name }), allMonths.map((month) => {
                                                    const total = getCategoryMonthTotal(transactions, cat.id, month);
                                                    return _jsx("td", { className: "amount-cell", children: total > 0 ? `₹${total.toFixed(0)}` : "—" }, `${cat.id}-${month}`);
                                                }), _jsxs("td", { className: "total-cell", children: ["\u20B9", rowTotal.toFixed(0)] })] }, cat.id));
                                    }), _jsxs("tr", { className: "grand-total-row", children: [_jsx("td", { className: "category-name", children: _jsx("strong", { children: "Total Expenses" }) }), allMonths.map((month) => {
                                                const monthTotal = getMonthlyTotals(transactions, month).totalExpenses;
                                                return _jsx("td", { className: "total-cell", children: _jsxs("strong", { children: ["\u20B9", monthTotal.toFixed(0)] }) }, `exp-total-${month}`);
                                            }), _jsx("td", { className: "total-cell", children: _jsxs("strong", { children: ["\u20B9", expenseCategories.reduce((sum, cat) => sum + allMonths.reduce((monthSum, month) => monthSum + getCategoryMonthTotal(transactions, cat.id, month), 0), 0).toFixed(0)] }) })] })] })] })] }), _jsxs("section", { className: "summary-section", children: [_jsx("h3", { children: "Income by Category" }), _jsxs("table", { className: "summary-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Category" }), allMonths.map((month) => (_jsx("th", { children: month }, month))), _jsx("th", { children: "Total" })] }) }), _jsxs("tbody", { children: [incomeCategories.map((cat) => {
                                        const rowTotal = allMonths.reduce((sum, month) => sum + getCategoryMonthTotal(transactions, cat.id, month), 0);
                                        return (_jsxs("tr", { children: [_jsx("td", { className: "category-name", children: cat.name }), allMonths.map((month) => {
                                                    const total = getCategoryMonthTotal(transactions, cat.id, month);
                                                    return _jsx("td", { className: "amount-cell", children: total > 0 ? `₹${total.toFixed(0)}` : "—" }, `${cat.id}-${month}`);
                                                }), _jsxs("td", { className: "total-cell", children: ["\u20B9", rowTotal.toFixed(0)] })] }, cat.id));
                                    }), _jsxs("tr", { className: "grand-total-row", children: [_jsx("td", { className: "category-name", children: _jsx("strong", { children: "Total Income" }) }), allMonths.map((month) => {
                                                const monthTotal = getMonthlyTotals(transactions, month).totalIncome;
                                                return _jsx("td", { className: "total-cell", children: _jsxs("strong", { children: ["\u20B9", monthTotal.toFixed(0)] }) }, `inc-total-${month}`);
                                            }), _jsx("td", { className: "total-cell", children: _jsxs("strong", { children: ["\u20B9", incomeCategories.reduce((sum, cat) => sum + allMonths.reduce((monthSum, month) => monthSum + getCategoryMonthTotal(transactions, cat.id, month), 0), 0).toFixed(0)] }) })] })] })] })] }), _jsxs("section", { className: "summary-section", children: [_jsx("h3", { children: "Monthly Net" }), _jsxs("table", { className: "summary-table net-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Month" }), _jsx("th", { children: "Income" }), _jsx("th", { children: "Expenses" }), _jsx("th", { children: "Net" })] }) }), _jsx("tbody", { children: allMonths.map((month) => {
                                    const totals = getMonthlyTotals(transactions, month);
                                    return (_jsxs("tr", { children: [_jsx("td", { className: "category-name", children: month }), _jsxs("td", { className: "amount-positive", children: ["\u20B9", totals.totalIncome.toFixed(0)] }), _jsxs("td", { className: "amount-negative", children: ["\u20B9", totals.totalExpenses.toFixed(0)] }), _jsx("td", { className: totals.net >= 0 ? "amount-positive" : "amount-negative", children: _jsxs("strong", { children: ["\u20B9", totals.net.toFixed(0)] }) })] }, month));
                                }) })] })] })] }));
}
