const API_BASE_URL = 'http://localhost:8000'; // or wherever your backend runs

// ------------------- HABITS -------------------

export async function createHabit(habitData) {
  const response = await fetch(`${API_BASE_URL}/habits/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(habitData)
  });
  return response.json();
}

export async function getHabits() {
  const response = await fetch(`${API_BASE_URL}/habits/`);
  return response.json();
}

// ✅ THIS is your `fetchHabits` alias (needed in AnalyticsPage.jsx)
export const fetchHabits = getHabits;

// ------------------- CHECK-INS -------------------

export async function addCheckIn(checkInData) {
  const response = await fetch(`${API_BASE_URL}/checkins/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(checkInData)
  });
  return response.json();
}

// ✅ This is the `fetchAnalytics` function (used per habit)
export async function fetchAnalytics(habitId) {
  const response = await fetch(`${API_BASE_URL}/habits/${habitId}/analytics`);
  return response.json();
}
