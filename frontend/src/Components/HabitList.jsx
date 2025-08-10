import React, { useEffect, useState } from "react";
import HabitItem from "./HabitItem";

function HabitList() {
  const [habits, setHabits] = useState([]);  // ✅ default to empty array
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // 🌀 optional

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/habits/");
        if (!response.ok) {
          throw new Error("Failed to fetch habits");
        }
        const data = await response.json();
        setHabits(data);
      } catch (err) {
        console.error("Error fetching habits:", err);
        setError("Could not load habits.");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  if (loading) return <p>Loading habits...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2 style={{ color: "red",marginTop: 4, fontSize: 35,textDecoration: "underline"}}>Your Habits</h2>
      {habits.length === 0 ? (
        <p>No habits yet.</p>
      ) : (
        habits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} />
        ))
      )}
    </div>
  );
}

export default HabitList;
