from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app)

# Initialize database
def init_db():
    conn = sqlite3.connect('fitness_tracker.db')
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS workouts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            day_number INTEGER NOT NULL,
            exercises TEXT NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            weight REAL,
            height REAL,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS exercise_completion (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            workout_id INTEGER,
            exercise_name TEXT NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            reps_completed INTEGER,
            notes TEXT,
            FOREIGN KEY (workout_id) REFERENCES workouts (id)
        )
    ''')
    
    conn.commit()
    conn.close()

# Workout plan data
WORKOUT_PLAN = {
    1: {
        "title": "Upper Body + Core",
        "exercises": [
            {"name": "Push-ups", "reps": "12-15", "sets": 3},
            {"name": "Incline Push-ups", "reps": "12", "sets": 3},
            {"name": "Tricep Dips", "reps": "10-12", "sets": 3},
            {"name": "Shoulder Taps", "reps": "20 total", "sets": 3},
            {"name": "Mountain Climbers", "reps": "30 sec", "sets": 3},
            {"name": "Leg Raises", "reps": "15", "sets": 3},
            {"name": "Russian Twists", "reps": "20", "sets": 3},
            {"name": "Plank Hold", "reps": "30-45 sec", "sets": 3}
        ]
    },
    2: {
        "title": "Lower Body + Core",
        "exercises": [
            {"name": "Bodyweight Squats", "reps": "15-20", "sets": 3},
            {"name": "Wall Sit", "reps": "30-45 sec", "sets": 3},
            {"name": "Glute Bridges", "reps": "15", "sets": 3},
            {"name": "Calf Raises", "reps": "20", "sets": 3},
            {"name": "Side Plank Dips", "reps": "10 each side", "sets": 3},
            {"name": "Flutter Kicks", "reps": "30 sec", "sets": 3},
            {"name": "Heel Touches", "reps": "20", "sets": 3}
        ]
    },
    3: {
        "title": "HIIT + Core",
        "exercises": [
            {"name": "Jumping Jacks", "reps": "30 sec", "sets": 3},
            {"name": "High Knees", "reps": "30 sec", "sets": 3},
            {"name": "Squat Jumps", "reps": "15", "sets": 3},
            {"name": "Push-ups", "reps": "12", "sets": 3},
            {"name": "Bicycle Crunches", "reps": "20", "sets": 2},
            {"name": "Mountain Climbers", "reps": "30 sec", "sets": 2},
            {"name": "Plank Hold", "reps": "45 sec", "sets": 2}
        ]
    },
    4: {
        "title": "Core Focus + Mobility",
        "exercises": [
            {"name": "V-Ups", "reps": "15", "sets": 3},
            {"name": "Crunches", "reps": "20", "sets": 3},
            {"name": "Reverse Crunches", "reps": "15", "sets": 3},
            {"name": "Russian Twists", "reps": "30", "sets": 3},
            {"name": "Cat-Cow", "reps": "1 min", "sets": 2},
            {"name": "Spinal Twists", "reps": "1 min each side", "sets": 2},
            {"name": "Cobra Stretch", "reps": "1 min", "sets": 2}
        ]
    },
    5: {
        "title": "Full Body Strength + Cardio",
        "exercises": [
            {"name": "Push-ups", "reps": "15", "sets": 3},
            {"name": "Squats", "reps": "20", "sets": 3},
            {"name": "Tricep Dips", "reps": "12", "sets": 3},
            {"name": "Calf Raises", "reps": "20", "sets": 3},
            {"name": "Jumping Jacks", "reps": "30 sec", "sets": 3},
            {"name": "Plank to Push-up", "reps": "10", "sets": 2},
            {"name": "Leg Raises", "reps": "15", "sets": 2},
            {"name": "Skaters", "reps": "20", "sets": 2}
        ]
    },
    6: {
        "title": "Badminton + Optional Core",
        "exercises": [
            {"name": "Dynamic Stretches", "reps": "5 min", "sets": 1},
            {"name": "Badminton Play", "reps": "High Intensity", "sets": 1},
            {"name": "Plank", "reps": "1 min", "sets": 2},
            {"name": "Crunches", "reps": "20", "sets": 2},
            {"name": "Side Plank", "reps": "30 sec/side", "sets": 2},
            {"name": "Chin Tucks", "reps": "15", "sets": 2}
        ]
    },
    7: {
        "title": "Rest + Recovery",
        "exercises": [
            {"name": "Light Walking", "reps": "20-30 min", "sets": 1},
            {"name": "Gentle Yoga", "reps": "15-20 min", "sets": 1},
            {"name": "Stretching", "reps": "10 min", "sets": 1}
        ]
    }
}

@app.route('/api/workout-plan')
def get_workout_plan():
    # Generate 50 days of workout plan
    plan = {}
    for day in range(1, 51):
        cycle_day = ((day - 1) % 7) + 1
        plan[day] = {
            "day": day,
            "title": WORKOUT_PLAN[cycle_day]["title"],
            "exercises": WORKOUT_PLAN[cycle_day]["exercises"]
        }
    return jsonify(plan)

@app.route('/api/workouts', methods=['GET'])
def get_workouts():
    conn = sqlite3.connect('fitness_tracker.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM workouts ORDER BY date DESC')
    workouts = cursor.fetchall()
    conn.close()
    
    result = []
    for workout in workouts:
        result.append({
            'id': workout[0],
            'date': workout[1],
            'day_number': workout[2],
            'exercises': json.loads(workout[3]),
            'completed': bool(workout[4]),
            'created_at': workout[5]
        })
    
    return jsonify(result)

@app.route('/api/workouts', methods=['POST'])
def create_workout():
    data = request.get_json()
    
    conn = sqlite3.connect('fitness_tracker.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO workouts (date, day_number, exercises, completed)
        VALUES (?, ?, ?, ?)
    ''', (data['date'], data['day_number'], json.dumps(data['exercises']), data.get('completed', False)))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Workout created successfully'}), 201

@app.route('/api/workouts/<int:workout_id>', methods=['PUT'])
def update_workout(workout_id):
    data = request.get_json()
    
    conn = sqlite3.connect('fitness_tracker.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        UPDATE workouts 
        SET completed = ?, exercises = ?
        WHERE id = ?
    ''', (data.get('completed', False), json.dumps(data.get('exercises', [])), workout_id))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Workout updated successfully'})

@app.route('/api/progress', methods=['GET'])
def get_progress():
    conn = sqlite3.connect('fitness_tracker.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM progress ORDER BY date DESC')
    progress = cursor.fetchall()
    conn.close()
    
    result = []
    for p in progress:
        result.append({
            'id': p[0],
            'date': p[1],
            'weight': p[2],
            'height': p[3],
            'notes': p[4],
            'created_at': p[5]
        })
    
    return jsonify(result)

@app.route('/api/progress', methods=['POST'])
def add_progress():
    data = request.get_json()
    
    conn = sqlite3.connect('fitness_tracker.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        INSERT INTO progress (date, weight, height, notes)
        VALUES (?, ?, ?, ?)
    ''', (data['date'], data.get('weight'), data.get('height'), data.get('notes', '')))
    
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Progress added successfully'}), 201

@app.route('/api/progress/<int:progress_id>', methods=['DELETE'])
def delete_progress(progress_id):
    conn = sqlite3.connect('fitness_tracker.db')
    cursor = conn.cursor()
    cursor.execute('DELETE FROM progress WHERE id = ?', (progress_id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Progress deleted successfully'})

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)