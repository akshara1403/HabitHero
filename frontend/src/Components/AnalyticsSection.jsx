// src/components/AnalyticsSection.jsx
import React, { useEffect, useState } from "react";
import { fetchHabits, fetchAnalytics } from "../services/api";

function AnalyticsSection() {
  const [habits, setHabits] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const fetchedHabits = await fetchHabits();
        setHabits(fetchedHabits);

        const allAnalytics = {};
        for (let habit of fetchedHabits) {
          const data = await fetchAnalytics(habit.id);
          allAnalytics[habit.id] = data;
        }

        setAnalyticsData(allAnalytics);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    loadAnalytics();
  }, []);

  return (
    <div>
      <h2 style={{ color: "red",marginBottom: "20px",marginTop: "4px",fontSize: 35,textDecoration: "underline" }}>Analytics Summary</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {habits.map((habit) => {
          const analytics = analyticsData[habit.id];
          return (
            analytics && (
              <div
                key={habit.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  maxWidth: "1900px",
                }}
              >
                <h3 style={{ marginBottom: "8px" }}>{habit.name}</h3>
                <p>
                  <strong>Streak:</strong> {analytics.streak} days
                </p>
                <p>
                  <strong>Success Rate:</strong> {analytics.success_rate}%
                </p>
                <p>
                  <strong>Best Day:</strong> {analytics.best_day || "N/A"}
                </p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

export default AnalyticsSection;
