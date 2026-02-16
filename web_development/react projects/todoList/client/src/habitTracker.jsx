import React, { useState, useEffect } from 'react'
import './habitTracker.css'

function HabitTracker() {
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState('');

    // LOAD DATA EFFECT
    // 1. LOAD FROM SERVER (Replace your first useEffect)
    useEffect(() => {
        fetch('http://localhost:3005/api/habits')
            .then(res => res.json())
            .then(data => setHabits(data))
            .catch(err => console.error("Could not load habits:", err));
    }, []);

    // 2. SAVE TO SERVER (Replace your second useEffect)
    useEffect(() => {
        if (habits.length > 0) {
            fetch('http://localhost:3005/api/habits', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(habits)
            });
        }
    }, [habits]);

    // const addHabit = (e) => {
    //     e.preventDefault(); // Prevents page refresh on form submit
    //     if (newHabit.trim() === '') return;

    //     const habitObj = {
    //         id: Date.now(),
    //         text: newHabit,
    //         completed: false
    //     };

    //     setHabits([...habits, habitObj]);
    //     setNewHabit('');
    // };

    const addHabit = async (e) => {
        e.preventDefault(); 
        if (newHabit.trim() === '') return;
    
        // 1. Prepare the data
        const habitData = { text: newHabit };
    
        try {
            // 2. SEND to your Node.js server
            const response = await fetch('http://localhost:3005/api/habits', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(habitData)
            });
    
            if (response.ok) {
                const savedHabit = await response.json();
                
                // 3. Update the UI with the habit that now has a real MySQL ID
                setHabits([...habits, savedHabit]);
                setNewHabit('');
                console.log("Habit saved to MySQL!");
            }
        } catch (err) {
            console.error("Could not save habit to server:", err);
        }
    };

    const toggleHabit = (id) => {
        setHabits(habits.map(h => 
            h.id === id ? { ...h, completed: !h.completed } : h 
        ));

    };

    // Calculate percentage of completed habits
    const completedCount = habits.filter(h => h.completed).length;
    const progress = habits.length > 0 
      ? Math.round((completedCount / habits.length) * 100) 
        : 0;
    
    // ClearAll function
    const clearAll = () => {
        if (window.confirm("Are you sure you want to clear all habits?")) {
            setHabits([]);
        }
    };

    return (
        <div className="zen-wrapper">
            <div className="zen-card">
                <header>
                    <h1>Zen<span>Habits</span></h1>
                    <p>One small step every day.</p>
                </header>

                <div className="progress-container">
                    <div className="progress-stats">
                        <span>Daily Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="progress-bar-bg">
                        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                <form onSubmit={addHabit} className="habit-input">
                    <input 
                        type="text"
                        placeholder="Enter  a new habit..."
                        value={newHabit}
                        onChange={(e) => setNewHabit(e.target.value)}
                    />
                    <button type="submit">Grow</button>
                </form>

                <div className="habit-list">
                    {habits.length > 0 ? (
                        habits.map(habit => (
                            <div
                                key={habit.id}
                                className={`habit-item ${habit.completed ? 'done' : ''}`}
                                onClick={() => toggleHabit(habit.id)}
                            >
                                <div className="check-circle">
                                    {habit.completed && <i className="fa-solid fa-check"></i>}
                                </div>
                                <span>{habit.text}</span>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <i className="fa-solid fa-seedling" style={{marginBottom: '10px', fontSize: '1.5rem'}}></i>
                            <p>No habits yet. Plant your first seed above!</p>
                        </div>
                    )}
                </div>

                <button className="clear-btn" onClick={clearAll}>
                    <i className="fa-solid fa-trash-can"></i> Clear All Habits
                </button>
            </div>
        </div>
    );
}

export default HabitTracker
