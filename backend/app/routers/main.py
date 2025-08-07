from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.routers import habits, checkins
from app.database import create_tables



app = FastAPI(title="Habit Hero API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",  # if using Vite
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include route groups

app.include_router(habits.router, prefix="/habits", tags=["Habits"])
app.include_router(checkins.router, prefix="/checkins", tags=["Check-ins"])

@app.on_event("startup")
def on_startup():
    create_tables()
