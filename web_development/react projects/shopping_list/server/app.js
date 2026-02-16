// server setup
const express = require('express');
const db = require('./db');
const cors =  require('cors');

const app = express();
const PORT = 3006;

// --- ROUTES ---

// 1. FETCH ALL FROM MYSQL
app.get('/api/shop_card', async(req, res) => {
    try {
        // SQL query to get shopping card
        
    }
})