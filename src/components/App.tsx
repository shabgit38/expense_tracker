import { useState } from "react";
import { NavBar } from "./NavBar";
import { TransactionList } from "./TransactionList";
import { MonthlySummary } from "./MonthlySummary";
import { ExpenseStoreProvider } from "../state/useExpenseStore";
import "./styles/App.css";

export function App() {
  const [currentView, setCurrentView] = useState<"transactions" | "dashboard">("transactions");
  return (
    <ExpenseStoreProvider>
      <div className="app">
        <NavBar currentView={currentView} onViewChange={setCurrentView} />
        <main className="main-content">
          {currentView === "transactions" && <TransactionList />}
          {currentView === "dashboard" && <MonthlySummary />}
        </main>
        <footer className="app-footer">
          <p>Expense Tracker v0.1.0 | React + TypeScript | Ready for charts & forecasting</p>
        </footer>
      </div>
    </ExpenseStoreProvider>
  );
}