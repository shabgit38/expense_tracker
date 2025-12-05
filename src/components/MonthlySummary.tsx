import { useExpenseStore } from "../state/useExpenseStore";
import { getCategoryMonthTotal, getMonthlyTotals, getAllMonths, getCategoriesByType } from "../utils/calculations";

export function MonthlySummary() {
  const { transactions, categories } = useExpenseStore();
  const allMonths = getAllMonths(transactions);
  const expenseCategories = getCategoriesByType(categories, "Expense");
  const incomeCategories = getCategoriesByType(categories, "Income");

  return (
    <div className="monthly-summary-container">
      <h2>Monthly Summary</h2>

      <section className="summary-section">
        <h3>Expenses by Category</h3>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Category</th>
              {allMonths.map((month) => (<th key={month}>{month}</th>))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {expenseCategories.map((cat) => {
              const rowTotal = allMonths.reduce((sum, month) => sum + getCategoryMonthTotal(transactions, cat.id, month), 0);
              return (
                <tr key={cat.id}>
                  <td className="category-name">{cat.name}</td>
                  {allMonths.map((month) => {
                    const total = getCategoryMonthTotal(transactions, cat.id, month);
                    return <td key={`${cat.id}-${month}`} className="amount-cell">{total > 0 ? `₹${total.toFixed(0)}` : "—"}</td>;
                  })}
                  <td className="total-cell">₹{rowTotal.toFixed(0)}</td>
                </tr>
              );
            })}
            <tr className="grand-total-row">
              <td className="category-name"><strong>Total Expenses</strong></td>
              {allMonths.map((month) => {
                const monthTotal = getMonthlyTotals(transactions, month).totalExpenses;
                return <td key={`exp-total-${month}`} className="total-cell"><strong>₹{monthTotal.toFixed(0)}</strong></td>;
              })}
              <td className="total-cell"><strong>₹{expenseCategories.reduce((sum, cat) => sum + allMonths.reduce((monthSum, month) => monthSum + getCategoryMonthTotal(transactions, cat.id, month), 0), 0).toFixed(0)}</strong></td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="summary-section">
        <h3>Income by Category</h3>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Category</th>
              {allMonths.map((month) => (<th key={month}>{month}</th>))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {incomeCategories.map((cat) => {
              const rowTotal = allMonths.reduce((sum, month) => sum + getCategoryMonthTotal(transactions, cat.id, month), 0);
              return (
                <tr key={cat.id}>
                  <td className="category-name">{cat.name}</td>
                  {allMonths.map((month) => {
                    const total = getCategoryMonthTotal(transactions, cat.id, month);
                    return <td key={`${cat.id}-${month}`} className="amount-cell">{total > 0 ? `₹${total.toFixed(0)}` : "—"}</td>;
                  })}
                  <td className="total-cell">₹{rowTotal.toFixed(0)}</td>
                </tr>
              );
            })}
            <tr className="grand-total-row">
              <td className="category-name"><strong>Total Income</strong></td>
              {allMonths.map((month) => {
                const monthTotal = getMonthlyTotals(transactions, month).totalIncome;
                return <td key={`inc-total-${month}`} className="total-cell"><strong>₹{monthTotal.toFixed(0)}</strong></td>;
              })}
              <td className="total-cell"><strong>₹{incomeCategories.reduce((sum, cat) => sum + allMonths.reduce((monthSum, month) => monthSum + getCategoryMonthTotal(transactions, cat.id, month), 0), 0).toFixed(0)}</strong></td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="summary-section">
        <h3>Monthly Net</h3>
        <table className="summary-table net-table">
          <thead>
            <tr><th>Month</th><th>Income</th><th>Expenses</th><th>Net</th></tr>
          </thead>
          <tbody>
            {allMonths.map((month) => {
              const totals = getMonthlyTotals(transactions, month);
              return (
                <tr key={month}>
                  <td className="category-name">{month}</td>
                  <td className="amount-positive">₹{totals.totalIncome.toFixed(0)}</td>
                  <td className="amount-negative">₹{totals.totalExpenses.toFixed(0)}</td>
                  <td className={totals.net >= 0 ? "amount-positive" : "amount-negative"}><strong>₹{totals.net.toFixed(0)}</strong></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}