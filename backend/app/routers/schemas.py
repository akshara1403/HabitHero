from pydantic import BaseModel
from typing import List, Optional
from datetime import date

# ---------------- HABIT ----------------

class HabitBase(BaseModel):
    name: str
    #description: Optional[str] = None
    frequency: str  # "daily" or "weekly"
    category: str
    start_date: date

class HabitCreate(HabitBase):
    pass

class Habit(HabitBase):
    id: int
    class Config:
        orm_mode = True

# ---------------- CHECK-IN ----------------

class CheckInBase(BaseModel):
    date: date
    note: Optional[str] = None

class CheckInCreate(CheckInBase):
    habit_id: int

class CheckIn(CheckInBase):
    id: int
    habit_id: int
    class Config:
        orm_mode = True

# ---------------- ANALYTICS RESPONSE ----------------

class HabitAnalytics(BaseModel):
    habit_id: int
    name: str
    streak: int
    success_rate: float
    best_day: Optional[str] = None
