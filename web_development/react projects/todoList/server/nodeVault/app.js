// setup
const express = require('express');
const db = require('./db'); // Import our new pool
const cors = require('cors'); // Install this: npm install cors

const app = express();
const PORT = 3005;

app.use(cors()); // Allow React to connect
app.use(express.json());

// --- ROUTES ---

// 1. GET ALL
// 1. FETCH ALL FROM MYSQL
app.get('/api/habits', async (req, res) => {
    try {
        // SQL query to get habits
        const [rows] = await db.query("SELECT * FROM habits ORDER BY created_at DESC");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

// 2. ADD NEW HABIT (POST to MySQL)
app.post('/api/habits', async (req, res) => {
    const { text } = req.body;
    const today = new Date().toISOString().slice(0, 10); // Formats date to YYYY-MM-DD for MySQL

    try {
        // We use ? to safely pass data into the query
        const query = "INSERT INTO habits (text, completed, created_at) VALUES (?, ?, ?)";
        const [result] = await db.query(query, [text, false, today]);

        // Return the new habit object back to React
        res.status(201).json({
            id: result.insertId, // MySQL gives us the new ID automatically
            text: text,
            completed: false,
            created_at: today
        });
        
        console.log(`✅ Habit added to DB with ID: ${result.insertId}`);
    } catch (err) {
        console.error("❌ SQL Error:", err);
        res.status(500).json({ error: "Failed to save to database" });
    }
});

// 3. TOGGLE HABIT (PUT)
app.put('/api/habits/:id', async (req, res) => {
    const habitId = req.params.id;
    const { completed } = req.body; // React sends the new status

    try {
        const query = "UPDATE habits SET completed = ? WHERE id = ?";
        await db.query(query, [completed, habitId]);
        
        res.json({ message: "Status updated in DB!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update habit" });
    }
});

// 4. DELETE HABIT (DELETE)
app.delete('/api/habits/:id', async (req, res) => {
    const habitId = req.params.id;

    try {
        const query = "DELETE FROM habits WHERE id = ?";
        await db.query(query, [habitId]);
        
        res.json({ message: "Habit removed from DB!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete habit" });
    }
});

app.listen(PORT, () => console.log(`Habit Server live on http://localhost:${PORT}`));