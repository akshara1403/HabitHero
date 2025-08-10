from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import schemas, crud
from app.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Create a new habit
@router.post("/", response_model=schemas.Habit)
def create_habit(habit: schemas.HabitCreate, db: Session = Depends(get_db)):
    return crud.create_habit(db, habit)

# Get all habits
@router.get("/", response_model=List[schemas.Habit])
def read_habits(db: Session = Depends(get_db)):
    return crud.get_all_habits(db)

# Get analytics for a habit
@router.get("/{habit_id}/analytics", response_model=schemas.HabitAnalytics)
def get_analytics(habit_id: int, db: Session = Depends(get_db)):
    analytics = crud.calculate_analytics(db, habit_id)
    if not analytics:
        raise HTTPException(status_code=404, detail="Habit not found")
    return analytics


from fastapi.responses import JSONResponse
from app.models import CheckIn

@router.get("/debug/{habit_id}")
def debug_habit(habit_id: int, db: Session = Depends(get_db)):
    habit = crud.get_habit_by_id(db, habit_id)
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    checkins = crud.get_checkins_by_habit(db, habit_id)
    checkin_data = [
        {"id": c.id, "date": c.date.isoformat(), "note": c.note}
        for c in checkins
    ]

    analytics = crud.calculate_analytics(db, habit_id)
    return JSONResponse({
        "habit": {
            "id": habit.id,
            "name": habit.name,
            "frequency": habit.frequency,
            "start_date": habit.start_date.isoformat()
        },
        "checkins": checkin_data,
        "analytics": {
            "streak": analytics.streak,
            "success_rate": analytics.success_rate,
            "best_day": analytics.best_day
        }
    })

