interface NavBarProps {
  currentView: "transactions" | "consolidation" | "dashboard";
  onViewChange: (view: "transactions" | "consolidation" | "dashboard") => void;
}

export function NavBar({ currentView, onViewChange }: NavBarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Expense Tracker</h1>
        <ul className="navbar-links">
          <li>
            <button
              className={`nav-link ${currentView === "transactions" ? "active" : ""}`}
              onClick={() => onViewChange("transactions")}
            >
              Transactions
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentView === "consolidation" ? "active" : ""}`}
              onClick={() => onViewChange("consolidation")}
            >
              Consolidation
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${currentView === "dashboard" ? "active" : ""}`}
              onClick={() => onViewChange("dashboard")}
            >
              Dashboard
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}