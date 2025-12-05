import React, { useMemo } from "react";
import { useExpenseStore } from "../state/useExpenseStore";
import { Transaction } from "../models/types";
import "./styles/ConsolidationView.css";

interface CategoryMonthData {
  [category: string]: {
    [month: string]: number;
  };
}

export function ConsolidationView() {
  const { transactions, categories } = useExpenseStore();

  const expenseTransactions = transactions.filter(
    (txn: Transaction) => txn.type === "Expense"
  );

  const consolidatedData = useMemo(() => {
    const data: CategoryMonthData = {};
    const months = new Set<string>();

    expenseTransactions.forEach((txn: Transaction) => {
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

  const calculateCategoryTotal = (category: string) => {
    return Object.values(consolidatedData.data[category] || {}).reduce(
      (sum, val) => sum + val,
      0
    );
  };

  const calculateMonthTotal = (month: string) => {
    return categoryNames.reduce(
      (sum, cat) => sum + (consolidatedData.data[cat][month] || 0),
      0
    );
  };

  const grandTotal = categoryNames.reduce(
    (sum, cat) => sum + calculateCategoryTotal(cat),
    0
  );

  return (
    <div className="consolidation-view">
      <h2>Monthly Consolidation</h2>
      <div className="table-wrapper">
        <table className="consolidation-table">
          <thead>
            <tr>
              <th>Category</th>
              {months.map((month) => (
                <th key={month}>{month}</th>
              ))}
              <th className="total-col">Grand Total</th>
            </tr>
          </thead>
          <tbody>
            {categoryNames.map((category) => (
              <tr key={category}>
                <td className="category-cell">{category}</td>
                {months.map((month) => (
                  <td key={`${category}-${month}`} className="amount-cell">
                    {consolidatedData.data[category][month]
                      ? `₹${consolidatedData.data[category][month].toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`
                      : ""}
                  </td>
                ))}
                <td className="amount-cell total-cell">
                  ₹{calculateCategoryTotal(category).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
            <tr className="total-row">
              <td className="category-cell">Grand Total</td>
              {months.map((month) => (
                <td key={`total-${month}`} className="amount-cell total-cell">
                  ₹{calculateMonthTotal(month).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              ))}
              <td className="amount-cell total-cell">
                ₹{grandTotal.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
