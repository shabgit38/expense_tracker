import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function NavBar({ currentView, onViewChange }) {
    return (_jsx("nav", { className: "navbar", children: _jsxs("div", { className: "navbar-container", children: [_jsx("h1", { className: "navbar-title", children: "\uD83D\uDCB0 Expense Tracker" }), _jsxs("ul", { className: "navbar-links", children: [_jsx("li", { children: _jsx("button", { className: `nav-link ${currentView === "transactions" ? "active" : ""}`, onClick: () => onViewChange("transactions"), children: "Transactions" }) }), _jsx("li", { children: _jsx("button", { className: `nav-link ${currentView === "dashboard" ? "active" : ""}`, onClick: () => onViewChange("dashboard"), children: "Dashboard" }) })] })] }) }));
}
