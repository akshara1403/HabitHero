import React, { useState } from "react";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";
import AnalyticsSection from './components/AnalyticsSection';
import HomePage from "./components/HomePage";

import "./App.css";

function App() {
  const [showHome, setShowHome] = useState(true);
  const [activeSection, setActiveSection] = useState("add");

  if (showHome) {
    return <HomePage onStart={() => setShowHome(false)} />;
  }

  return (
    <div className="analytics-container">
      {/* Top Navigation Bar */}
      <header className="topbar">
      <h1><span className="red">Habit</span> Hero</h1>
      </header>

      {/* Side Menu */}
      <aside className="sidebar">
        <nav>
          <ul>
          <li><button onClick={() => setShowHome(true)}>🏠 Home</button></li> {/* ← New Home button */}
            <li><button onClick={() => setActiveSection("add")}>➕ Add Habit</button></li>
            <li><button onClick={() => setActiveSection("list")}>📋 Your Habits</button></li>
            <li><button onClick={() => setActiveSection("analytics")}>📊 Analytics</button></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeSection === "add" && <AddHabitForm />}
        {activeSection === "list" && <HabitList />}
        {activeSection === "analytics" && <AnalyticsSection />}
      </main>
    </div>
  );
}

export default App;
