import React from "react";
import "./HomePage.css"; // We'll style it separately

function HomePage({ onStart }) {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1><span className="red">Habit</span> Hero</h1>
      </header>

      <section className="homepage-content">
        <h2>Consistency is Your Superpower — <span className="red">Track It !</span></h2>
        <p>
          Struggling to stay consistent? Habit Hero simplifies the process of habit-building with 
          a beautiful interface and smart tracking, helping you show up even when it’s hard
        </p>

        <button className="start-button" onClick={onStart}>Start</button>

        <div className="illustrations">
          <img src="/group4.jpg" alt="Illustration 1" />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
