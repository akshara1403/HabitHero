// src/components/Layout.jsx
import React from 'react';
import './Layout.css'; // We'll use the same styling from AnalyticsPage.css

const Layout = ({ children }) => {
  return (
    <div className="analytics-container">
      {/* Top Navigation Bar */}
      <header className="analytics-topbar">
      <h1 className="app-title">
     <span className="red-text">Habit</span> <span className="white-text">Hero</span>
        </h1>

      </header>

    

      {/* Side Menu */}
      <aside className="sidebar">
        <nav>
          <ul>
            <li><a href="/">🏠 Home</a></li>
            <li><a href="/your-habits">📋 Your Habits</a></li>
            <li><a href="/analytics">📊 Analytics</a></li>
          </ul>
        </nav>
      </aside>

      {/* Page-specific content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
