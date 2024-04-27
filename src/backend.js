import express from 'express';
import sqlite3 from 'sqlite3';

const app = express()
const db = new sqlite3.Database('identifier.sqlite')

app.get('/data', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message})
            return
        }
        res.json(rows)
    })
})

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
