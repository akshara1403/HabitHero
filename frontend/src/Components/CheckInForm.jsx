import React, { useState } from "react";

function CheckInForm({ habitId, onCheckIn }) {
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date) {
      setError("Please select a date.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/checkins/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          habit_id: habitId,
          date,
          note: note || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to submit check-in");
      }

      // Success
      setNote("");
      setDate("");
      setError("");
      setSuccess(true);

      if (onCheckIn) onCheckIn(); // optional refresh
    } catch (err) {
      console.error("Check-in failed:", err);
      setError("Check-in failed. Try again.");
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <h4>Check In</h4>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Check-in successful!</p>}

      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{ marginLeft: "10px", marginRight: "10px" }}
        />
      </label>

      <label>
        Note:
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        />
      </label>

      <button type="submit" className="start-button">Submit</button>
    </form>
  );
}

export default CheckInForm;
