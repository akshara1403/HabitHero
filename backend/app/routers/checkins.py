from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app import schemas, crud
from app.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Add a check-in
@router.post("/", response_model=schemas.CheckIn)
def create_checkin(checkin: schemas.CheckInCreate, db: Session = Depends(get_db)):
    habit = crud.get_habit_by_id(db, checkin.habit_id)
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")

    if checkin.date < habit.start_date:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot check in before the habit start date: {habit.start_date}"
        )

    created = crud.create_checkin(db, checkin)
    print(f"✅ Check-in saved for habit_id={checkin.habit_id} on {checkin.date}")
    return created





# Get check-ins for a habit
@router.get("/{habit_id}", response_model=List[schemas.CheckIn])
def get_checkins(habit_id: int, db: Session = Depends(get_db)):
    return crud.get_checkins_by_habit(db, habit_id)

