import React, { useState, useEffect } from 'react';
import { Calendar, Activity, TrendingUp, CheckCircle, Plus, X, Edit3, Save, Target, Dumbbell, Award, Flame } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';


const App = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [workoutPlan, setWorkoutPlan] = useState({});
  const [completedWorkouts, setCompletedWorkouts] = useState({});
  const [progressData, setProgressData] = useState([]);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [showPostWorkoutModal, setShowPostWorkoutModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [newProgress, setNewProgress] = useState({ weight: '', height: '', notes: '' });
  const [startDate, setStartDate] = useState(null);

  // Initialize start date and workout plan
  useEffect(() => {
    const today = new Date();
    setStartDate(today);

    // Initialize workout plan
    const generateWorkoutPlan = () => {
      const workoutTypes = {
        1: { title: "Upper Body + Core", color: "bg-gradient-to-br from-red-500 to-pink-600", icon: "💪" },
        2: { title: "Lower Body + Core", color: "bg-gradient-to-br from-blue-500 to-cyan-600", icon: "🦵" },
        3: { title: "HIIT + Core", color: "bg-gradient-to-br from-green-500 to-emerald-600", icon: "⚡" },
        4: { title: "Core Focus + Mobility", color: "bg-gradient-to-br from-purple-500 to-violet-600", icon: "🧘" },
        5: { title: "Full Body Strength + Cardio", color: "bg-gradient-to-br from-orange-500 to-amber-600", icon: "🔥" },
        6: { title: "Badminton + Optional Core", color: "bg-gradient-to-br from-teal-500 to-cyan-600", icon: "🏸" },
        7: { title: "Rest + Recovery", color: "bg-gradient-to-br from-gray-500 to-slate-600", icon: "😴" }
      };

      const plan = {};
      for (let day = 1; day <= 50; day++) {
        const cycleDay = ((day - 1) % 7) + 1;
        const workoutDate = new Date(today);
        workoutDate.setDate(today.getDate() + day - 1);
        
        plan[day] = {
          ...workoutTypes[cycleDay],
          day: day,
          date: workoutDate.toISOString().split('T')[0],
          exercises: getExercisesForDay(cycleDay)
        };
      }
      return plan;
    };

    setWorkoutPlan(generateWorkoutPlan());

    // Initialize with current user data
    const initialProgress = [
      { 
        date: today.toISOString().split('T')[0], 
        weight: 88.34, 
        height: 180,
        notes: 'Starting the 50-day challenge!' 
      }
    ];
    setProgressData(initialProgress);
  }, []);

  const getExercisesForDay = (cycleDay) => {
    const exercises = {
      1: [
        { name: "Push-ups", reps: "12-15", sets: 3, duration: "3 min" },
        { name: "Incline Push-ups", reps: "12", sets: 3, duration: "3 min" },
        { name: "Tricep Dips", reps: "10-12", sets: 3, duration: "3 min" },
        { name: "Shoulder Taps", reps: "20 total", sets: 3, duration: "3 min" },
        { name: "Mountain Climbers", reps: "30 sec", sets: 3, duration: "3 min" },
        { name: "Leg Raises", reps: "15", sets: 3, duration: "3 min" },
        { name: "Russian Twists", reps: "20", sets: 3, duration: "3 min" },
        { name: "Plank Hold", reps: "30-45 sec", sets: 3, duration: "3 min" }
      ],
      2: [
        { name: "Bodyweight Squats", reps: "15-20", sets: 3, duration: "3 min" },
        { name: "Wall Sit", reps: "30-45 sec", sets: 3, duration: "3 min" },
        { name: "Glute Bridges", reps: "15", sets: 3, duration: "3 min" },
        { name: "Calf Raises", reps: "20", sets: 3, duration: "3 min" },
        { name: "Side Plank Dips", reps: "10 each side", sets: 3, duration: "4 min" },
        { name: "Flutter Kicks", reps: "30 sec", sets: 3, duration: "3 min" },
        { name: "Heel Touches", reps: "20", sets: 3, duration: "3 min" }
      ],
      3: [
        { name: "Jumping Jacks", reps: "30 sec", sets: 3, duration: "3 min" },
        { name: "High Knees", reps: "30 sec", sets: 3, duration: "3 min" },
        { name: "Squat Jumps", reps: "15", sets: 3, duration: "3 min" },
        { name: "Push-ups", reps: "12", sets: 3, duration: "3 min" },
        { name: "Bicycle Crunches", reps: "20", sets: 2, duration: "2 min" },
        { name: "Mountain Climbers", reps: "30 sec", sets: 2, duration: "2 min" },
        { name: "Plank Hold", reps: "45 sec", sets: 2, duration: "2 min" }
      ],
      4: [
        { name: "V-Ups", reps: "15", sets: 3, duration: "3 min" },
        { name: "Crunches", reps: "20", sets: 3, duration: "3 min" },
        { name: "Reverse Crunches", reps: "15", sets: 3, duration: "3 min" },
        { name: "Russian Twists", reps: "30", sets: 3, duration: "3 min" },
        { name: "Cat-Cow", reps: "1 min", sets: 2, duration: "2 min" },
        { name: "Spinal Twists", reps: "1 min each side", sets: 2, duration: "4 min" },
        { name: "Cobra Stretch", reps: "1 min", sets: 2, duration: "2 min" }
      ],
      5: [
        { name: "Push-ups", reps: "15", sets: 3, duration: "3 min" },
        { name: "Squats", reps: "20", sets: 3, duration: "3 min" },
        { name: "Tricep Dips", reps: "12", sets: 3, duration: "3 min" },
        { name: "Calf Raises", reps: "20", sets: 3, duration: "3 min" },
        { name: "Jumping Jacks", reps: "30 sec", sets: 3, duration: "3 min" },
        { name: "Plank to Push-up", reps: "10", sets: 2, duration: "3 min" },
        { name: "Leg Raises", reps: "15", sets: 2, duration: "2 min" },
        { name: "Skaters", reps: "20", sets: 2, duration: "2 min" }
      ],
      6: [
        { name: "Dynamic Stretches", reps: "5 min", sets: 1, duration: "5 min" },
        { name: "Badminton Play", reps: "High Intensity", sets: 1, duration: "30 min" },
        { name: "Plank", reps: "1 min", sets: 2, duration: "2 min" },
        { name: "Crunches", reps: "20", sets: 2, duration: "2 min" },
        { name: "Side Plank", reps: "30 sec/side", sets: 2, duration: "2 min" },
        { name: "Chin Tucks", reps: "15", sets: 2, duration: "2 min" }
      ],
      7: [
        { name: "Light Walking", reps: "20-30 min", sets: 1, duration: "30 min" },
        { name: "Gentle Yoga", reps: "15-20 min", sets: 1, duration: "20 min" },
        { name: "Stretching", reps: "10 min", sets: 1, duration: "10 min" }
      ]
    };
    return exercises[cycleDay] || [];
  };

  const toggleWorkoutCompletion = (day) => {
    const wasCompleted = completedWorkouts[day];
    
    setCompletedWorkouts(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
    
    // Show post-workout modal only when marking as complete
    if (!wasCompleted) {
      setSelectedDay(day);
      setShowPostWorkoutModal(true);
    }
  };

  const addProgress = () => {
    if (newProgress.weight || newProgress.height || newProgress.notes) {
      const today = new Date().toISOString().split('T')[0];
      const lastEntry = progressData[progressData.length - 1] || {};
      
      const newEntry = {
        date: today,
        weight: parseFloat(newProgress.weight) || lastEntry.weight || 88.34,
        height: parseFloat(newProgress.height) || lastEntry.height || 180,
        notes: newProgress.notes || ''
      };
      
      setProgressData(prev => [...prev, newEntry]);
      setNewProgress({ weight: '', height: '', notes: '' });
      setShowProgressModal(false);
      setShowPostWorkoutModal(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${month}/${day}`;
  };

  const getStreakCount = () => {
    let streak = 0;
    for (let day = 1; day <= 50; day++) {
      if (completedWorkouts[day]) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const completedCount = Object.values(completedWorkouts).filter(Boolean).length;
  const completionRate = (completedCount / 50 * 100).toFixed(1);
  const currentStreak = getStreakCount();

  const CalendarView = () => (
    <div className="p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 mb-8">
        {[...Array(50)].map((_, index) => {
          const day = index + 1;
          const workout = workoutPlan[day];
          const isCompleted = completedWorkouts[day];
          const workoutDate = workout?.date ? new Date(workout.date) : null;
          const isToday = workoutDate && workoutDate.toDateString() === new Date().toDateString();
          const isPast = workoutDate && workoutDate < new Date() && !isToday;
          
          return (
            <div
              key={day}
              className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                isCompleted 
                  ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-400 shadow-md transform scale-105' 
                  : isToday
                  ? 'bg-gradient-to-br from-yellow-100 to-amber-100 border-yellow-400 shadow-md ring-2 ring-yellow-300'
                  : isPast && !isCompleted
                  ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'
                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                setSelectedDay(day);
                setShowWorkoutModal(true);
              }}
            >
              <div className="text-center">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-bold text-gray-600">
                    Day {day}
                  </div>
                  {isToday && (
                    <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      TODAY
                    </div>
                  )}
                </div>
                
                {workout && (
                  <div className={`text-xs p-2 rounded-lg text-white mb-2 ${workout.color}`}>
                    <div className="text-lg mb-1">{workout.icon}</div>
                    <div className="font-medium leading-tight">{workout.title}</div>
                  </div>
                )}
                
                {workoutDate && (
                  <div className="text-xs text-gray-500 mb-2">
                    {formatDate(workout.date)}
                  </div>
                )}
                
                {isCompleted && (
                  <div className="flex justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8" />
            <div>
              <div className="text-2xl font-bold">{completedCount}/50</div>
              <div className="text-green-100">Workouts Completed</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8" />
            <div>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <div className="text-blue-100">Completion Rate</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8" />
            <div>
              <div className="text-2xl font-bold">{currentStreak}</div>
              <div className="text-orange-100">Day Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProgressView = () => (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Progress Tracking</h2>
        <button
          onClick={() => setShowProgressModal(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          Add Entry
        </button>
      </div>

      {/* Progress Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8" />
            <div>
              <div className="text-2xl font-bold">{completedCount}/50</div>
              <div className="text-indigo-100">Workouts Done</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8" />
            <div>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <div className="text-green-100">Success Rate</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8" />
            <div>
              <div className="text-2xl font-bold">
                {progressData.length > 0 ? `${progressData[progressData.length - 1].weight} kg` : '--'}
              </div>
              <div className="text-pink-100">Current Weight</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weight Progress Chart */}
      {progressData.length > 0 && (
        <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">Weight Progress Over Time</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={progressData}>
              <defs>
                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#666"
                fontSize={12}
              />
              <YAxis 
                domain={['dataMin - 2', 'dataMax + 2']} 
                stroke="#666"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value, name) => [`${value} kg`, 'Weight']}
                labelFormatter={(date) => {
                  const d = new Date(date);
                  return d.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  });
                }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="weight" 
                stroke="#3B82F6" 
                fill="url(#colorWeight)"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Progress History */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Progress History</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {progressData.slice().reverse().map((entry, index) => (
            <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {entry.weight} kg
                  </div>
                  <div className="text-sm text-gray-600">
                    Height: {entry.height} cm
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                {entry.notes && (
                  <div className="text-sm text-gray-600 max-w-xs">
                    "{entry.notes}"
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const WorkoutModal = () => {
    if (!selectedDay || !workoutPlan[selectedDay]) return null;

    const workout = workoutPlan[selectedDay];
    const isCompleted = completedWorkouts[selectedDay];
    const totalDuration = workout.exercises.reduce((total, exercise) => {
      const duration = parseInt(exercise.duration) || 0;
      return total + duration;
    }, 0);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Day {selectedDay}: {workout.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(workout.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Activity className="w-4 h-4" />
                    ~{totalDuration} min
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowWorkoutModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {workout.exercises.map((exercise, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">{exercise.name}</h3>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          {exercise.sets} sets × {exercise.reps}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          ~{exercise.duration}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl ml-4">
                      <Dumbbell className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowWorkoutModal(false)}
                className="flex-1 py-4 px-6 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toggleWorkoutCompletion(selectedDay);
                  setShowWorkoutModal(false);
                }}
                className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                  isCompleted
                    ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                }`}
              >
                {isCompleted ? 'Mark as Incomplete' : 'Complete Workout'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PostWorkoutModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Workout Complete!</h2>
            <p className="text-gray-600">Congratulations! Would you like to update your progress?</p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={newProgress.weight}
                onChange={(e) => setNewProgress(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your current weight"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={newProgress.height}
                onChange={(e) => setNewProgress(prev => ({ ...prev, height: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your current height"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How do you feel?
              </label>
              <textarea
                value={newProgress.notes}
                onChange={(e) => setNewProgress(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                rows="3"
                placeholder="Any notes about today's workout..."
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowPostWorkoutModal(false)}
              className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Skip
            </button>
            <button
              onClick={addProgress}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Add Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProgressModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-8">
                    <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add Progress Entry</h2>
            <button
              onClick={() => setShowProgressModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={newProgress.weight}
                onChange={(e) => setNewProgress(prev => ({ ...prev, weight: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your current weight"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={newProgress.height}
                onChange={(e) => setNewProgress(prev => ({ ...prev, height: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your current height"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={newProgress.notes}
                onChange={(e) => setNewProgress(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                rows="3"
                placeholder="Any notes about your progress..."
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowProgressModal(false)}
              className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={addProgress}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Save Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
return (
  <div className="min-h-screen bg-gray-50">
    {/* Top Navigation Tabs */}
    <header className="bg-white shadow sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">50-Day Fitness Challenge</h1>
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              activeTab === 'calendar'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Calendar
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              activeTab === 'progress'
                ? 'bg-purple-600 text-white font-semibold shadow'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Activity className="w-4 h-4" />
            Progress
          </button>
        </nav>
      </div>
    </header>

    {/* View Renderer */}
    <main className="max-w-7xl mx-auto">
      {activeTab === 'calendar' && <CalendarView />}
      {activeTab === 'progress' && <ProgressView />}
    </main>

    {/* Modals */}
    {showWorkoutModal && <WorkoutModal />}
    {showPostWorkoutModal && <PostWorkoutModal />}
    {showProgressModal && <ProgressModal />}
  </div>
);}
export default App;