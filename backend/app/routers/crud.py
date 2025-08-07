from sqlalchemy.orm import Session
from collections import Counter
from datetime import date, timedelta
from collections import defaultdict

from app import models, schemas

# ---------------- HABITS ----------------

def create_habit(db: Session, habit_data: schemas.HabitCreate):
    habit = models.Habit(**habit_data.dict())
    db.add(habit)
    db.commit()
    db.refresh(habit)
    return habit

def get_all_habits(db: Session):
    return db.query(models.Habit).all()

def get_habit_by_id(db: Session, habit_id: int):
    return db.query(models.Habit).filter(models.Habit.id == habit_id).first()

# ---------------- CHECK-INS ----------------

def create_checkin(db: Session, checkin: schemas.CheckInCreate):
    db_checkin = models.CheckIn(
        habit_id=checkin.habit_id,
        date=checkin.date,
        note=checkin.note
    )
    db.add(db_checkin)
    db.commit()
    db.refresh(db_checkin)

    # ✅ ADD THIS LINE
    print(f"📌 Check-in committed to DB: {db_checkin}")

    return db_checkin


def get_checkins_by_habit(db: Session, habit_id: int):
    return db.query(models.CheckIn).filter(models.CheckIn.habit_id == habit_id).all()

# ---------------- ANALYTICS ----------------
# crud.py
def calculate_analytics(db: Session, habit_id: int):
    from datetime import date, timedelta
    from collections import Counter
    from calendar import monthrange

    habit = get_habit_by_id(db, habit_id)
    if not habit:
        return None

    checkins = get_checkins_by_habit(db, habit_id)
    today = date.today()
    start_date = habit.start_date

    if start_date > today:
        return schemas.HabitAnalytics(
            habit_id=habit.id,
            name=habit.name,
            streak=0,
            success_rate=0.0,
            best_day=None
        )

    actual_checkin_dates = set(c.date for c in checkins if c.date >= start_date)

    # ========== Success Rate ========== #
    success_rate = 0.0
    expected_checkins = 0
    actual_checkins = 0

    if habit.frequency == "daily":
        total_days = (today - start_date).days + 1
        expected_checkins = total_days
        actual_checkins = sum(
            1 for i in range(total_days)
            if (start_date + timedelta(days=i)) in actual_checkin_dates
        )

    elif habit.frequency == "weekly":
        current = start_date
        weeks_set = set()
        while current <= today:
            year, week, _ = current.isocalendar()
            weeks_set.add((year, week))
            current += timedelta(days=1)

        expected_checkins = len(weeks_set)
        weeks_with_checkins = set(
            (c.date.isocalendar()[0], c.date.isocalendar()[1])
            for c in checkins if c.date >= start_date
        )
        actual_checkins = len(weeks_set & weeks_with_checkins)

    elif habit.frequency == "monthly":
        current = start_date
        months_set = set()
        while current <= today:
            months_set.add((current.year, current.month))
            # Jump to first of next month
            if current.month == 12:
                current = date(current.year + 1, 1, 1)
            else:
                current = date(current.year, current.month + 1, 1)

        expected_checkins = len(months_set)
        months_with_checkins = set((c.date.year, c.date.month) for c in checkins if c.date >= start_date)
        actual_checkins = len(months_set & months_with_checkins)

    success_rate = min((actual_checkins / expected_checkins) * 100, 100.0) if expected_checkins > 0 else 0.0

    # ========== Streak ========== #
    streak = 0

    if habit.frequency == "daily":
        day = today
        while day in actual_checkin_dates:
            streak += 1
            day -= timedelta(days=1)

    elif habit.frequency == "weekly":
        current_year, current_week, _ = today.isocalendar()
        weeks_with_checkins = set(
            (c.date.isocalendar()[0], c.date.isocalendar()[1])
            for c in checkins if c.date >= start_date
        )
        while (current_year, current_week) in weeks_with_checkins:
            streak += 1
            current_week -= 1
            if current_week <= 0:
                current_year -= 1
                current_week = date(current_year, 12, 28).isocalendar()[1]

    elif habit.frequency == "monthly":
        months_with_checkins = set((c.date.year, c.date.month) for c in checkins if c.date >= start_date)
        current = today
        while (current.year, current.month) in months_with_checkins:
            streak += 1
            # Move to previous month
            if current.month == 1:
                current = date(current.year - 1, 12, 1)
            else:
                current = date(current.year, current.month - 1, 1)

    # ========== Best Day ========== #
    day_counts = Counter(
        c.date.strftime("%A") for c in checkins if c.date >= start_date
    )
    best_day = day_counts.most_common(1)[0][0] if day_counts else None

    return schemas.HabitAnalytics(
        habit_id=habit.id,
        name=habit.name,
        streak=streak,
        success_rate=round(success_rate, 2),
        best_day=best_day
    )
