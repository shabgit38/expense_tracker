import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { NavBar } from "./NavBar";
import { TransactionList } from "./TransactionList";
import { MonthlySummary } from "./MonthlySummary";
import { ExpenseStoreProvider } from "../state/useExpenseStore";
import "./styles/App.css";
export function App() {
    const [currentView, setCurrentView] = useState("transactions");
    return (_jsx(ExpenseStoreProvider, { children: _jsxs("div", { className: "app", children: [_jsx(NavBar, { currentView: currentView, onViewChange: setCurrentView }), _jsxs("main", { className: "main-content", children: [currentView === "transactions" && _jsx(TransactionList, {}), currentView === "dashboard" && _jsx(MonthlySummary, {})] }), _jsx("footer", { className: "app-footer", children: _jsx("p", { children: "Expense Tracker v0.1.0 | React + TypeScript | Ready for charts & forecasting" }) })] }) }));
}
