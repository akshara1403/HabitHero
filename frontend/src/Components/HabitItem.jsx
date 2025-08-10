import React from "react";
import CheckInForm from "./CheckInForm";

function HabitItem({ habit }) {
  const handleCheckInSuccess = () => {
    // You can still use this callback to trigger any post-check-in actions if needed
    console.log("Check-in successful for habit ID:", habit.id);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
      <h3>{habit.name}</h3>
      <p><strong>Frequency:</strong> {habit.frequency}</p>
      <p><strong>Category:</strong> {habit.category}</p>
      <p><strong>Start Date:</strong> {habit.start_date}</p>

      <CheckInForm habitId={habit.id} onCheckIn={handleCheckInSuccess} />
    </div>
  );
}

export default HabitItem;