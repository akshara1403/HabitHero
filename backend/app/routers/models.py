from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Habit(Base):
    __tablename__ = "habits"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    #description = Column(String)
    frequency = Column(String, nullable=False)  # "daily" or "weekly"
    category = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)

    checkins = relationship("CheckIn", back_populates="habit", cascade="all, delete")

class CheckIn(Base):
    __tablename__ = "checkins"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    note = Column(String, nullable=True)
    habit_id = Column(Integer, ForeignKey("habits.id"))

    habit = relationship("Habit", back_populates="checkins")
