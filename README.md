# 🏋️‍♀️ 50-Day Fitness Tracker

A full-stack web application designed to help users stay consistent with a structured 50-day workout plan. Users can log workouts, track progress, view completion statistics, and maintain a performance streak. Built using **React** for the frontend and **Flask + SQLite** for the backend.

---

## ✨ Features

- 📆 **Calendar View** with 50-day workout schedule  
- ✅ Mark workouts as complete/incomplete  
- 📈 Track weight and height over time  
- 🔥 View workout completion stats and streaks  
- 📊 Dynamic progress chart using Recharts  
- 📝 Post-workout journaling and progress notes  

---

## 🛠 Tech Stack

### Frontend:
- React (with Hooks)  
- Tailwind CSS  
- Recharts (for charts)  
- Lucide Icons (for UI icons)  

### Backend:
- Python Flask  
- SQLite (as a lightweight local database)  
- Flask-CORS (for handling cross-origin requests)  

---

## 📁 Project Structure

```bash
fitness-tracker/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── db.sqlite3
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   └── package.json
│
├── README.md
└── ...


--
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/fitness-tracker.git
cd fitness-tracker
```
### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py  # Starts the Flask server
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```
