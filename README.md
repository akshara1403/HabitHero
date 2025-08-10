# Habit Hero 

**Habit Hero** is a habit tracking web app that helps users build and maintain good habits through regular check-ins and analytics. Built with **React** and **FastAPI**, it provides a clean UI, habit analytics, and a check-in system.

---

## 🔧 Setup Instructions

###  Backend (FastAPI + SQLite)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/habit-hero.git
   cd habit-hero/backend
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the FastAPI Server**
   ```bash
   uvicorn main:app --reload
   ```

> API runs on `http://127.0.0.1:8000`

---

###  Frontend (React)

1. Open a new terminal and go to the frontend folder:
   ```bash
   cd ../habithero-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the React App**
   ```bash
   npm start
   ```

> App runs on `http://localhost:3000`

---

##  Features

1. Add new habits with:
- Name
- Description
- Frequency (Daily, Weekly, Monthly)
- Category
- Start date

2. View and manage all habits  
3. Mark daily check-ins  
4. See per-habit analytics:
-  Current streak
-  Success rate (based on frequency and days since start)
-  Best check-in day

5. Clean single-page layout with top & side nav  
6. Persistent data using SQLite  
7. Illustrative homepage with navigation to main app

---


## 🛠 Tech Stack

| Layer        | Technology        |
|--------------|-------------------|
| Frontend     | React (JavaScript)|
| Styling      | CSS (custom)      |
| Backend API  | FastAPI (Python)  |
| Database     | SQLite            |
| Dev Tools    | VS Code, Git      |

---


## 📁 Folder Structure

```
habit-hero/
│
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   └── database.py
│
└── habithero-frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.js
```

---

##  Credits

Created by **Akshara Surendran** as a full-stack project.
