export function getCategoryMonthTotal(transactions, categoryId, month) {
    return transactions.filter((txn) => txn.categoryId === categoryId && txn.month === month)
        .reduce((sum, txn) => sum + txn.amount, 0);
}
export function getMonthlyTotals(transactions, month) {
    const monthTransactions = transactions.filter((txn) => txn.month === month);
    const totalExpenses = monthTransactions.filter((txn) => txn.type === "Expense")
        .reduce((sum, txn) => sum + txn.amount, 0);
    const totalIncome = monthTransactions.filter((txn) => txn.type === "Income")
        .reduce((sum, txn) => sum + txn.amount, 0);
    return { month, totalExpenses, totalIncome, net: totalIncome - totalExpenses };
}
export function getAllMonths(transactions) {
    const months = new Set(transactions.map((txn) => txn.month));
    return Array.from(months).sort().reverse();
}
export function getCategoriesByType(categories, type) {
    return categories.filter((cat) => cat.type === type && cat.isActive);
}
