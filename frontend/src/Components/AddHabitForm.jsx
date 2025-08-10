import React, { useState } from "react";

function AddHabitForm({ onAdd }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [category, setCategory] = useState("health");
  const [startDate, setStartDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !frequency || !category || !startDate) {
      setError("Please fill in all required fields.");
      return;
    }

    const newHabit = {
      name,
      frequency,
      category,
      start_date: startDate,
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/habits/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHabit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error("Failed to add habit");
      }

      await response.json();
      

      // Reset form
      setName("");
      setFrequency("daily");
      setCategory("health");
      setStartDate("");
      setError("");
    } catch (err) {
      console.error("Error adding habit:", err);
      setError("Failed to add habit. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        marginBottom: "30px",
      }}
    >
      <h2 style={{ marginBottom: "25px", color: "red",marginTop: "4px",fontSize: 35,textDecoration: "underline"}}>Add a New Habit</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ marginRight: "10px" }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        

        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>Frequency:</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="health">Health</option>
            <option value="work">Work</option>
            <option value="learning">Learning</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="start-button">Add Habit</button>
      </form>
    </div>
  );
}

export default AddHabitForm;
