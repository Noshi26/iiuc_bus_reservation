const express = require('express');
const mysql = require('mysql'); // Use the 'mysql' library
const app = express();
const path = require('path');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.static(path.join(__dirname, 'public')));


const dbConfig = {
    host: 'localhost',
    user: 'nowshin12',
    password: '123456',
    database: 'iiuc',
};

// Create a reusable database connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
    }
});

app.use(express.json());

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        // Check if the username already exists
        const checkSql = 'SELECT * FROM users WHERE username = ?';
        const checkValues = [username];

        connection.query(checkSql, checkValues, (checkErr, checkRows) => {
            if (checkErr) {
                console.error('Sign-up check error:', checkErr);
                res.status(500).json({ message: 'An error occurred during sign-up' });
            } else if (checkRows.length > 0) {
                // User with the same username already exists
                res.status(409).json({ message: 'Username already in use' });
            } else {
                // Insert the new user if the username is unique
                const insertSql = 'INSERT INTO users (username, password) VALUES (?, ?)';
                const insertValues = [username, password];

                connection.query(insertSql, insertValues, (insertErr, result) => {
                    if (insertErr) {
                        console.error('Sign-up error:', insertErr);
                        res.status(500).json({ message: 'An error occurred during sign-up' });
                    } else {
                        res.status(201).json({ message: 'Sign-up successful', user: { id: result.insertId, username, password } });
                    }
                });
            }
        });
    } catch (error) {
        console.error('Exception:', error);
        res.status(500).json({ message: 'An error occurred during sign-up' });
    }
});




app.post('/loginTeacher', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const sql = 'SELECT * FROM teacher_user WHERE username = ?';
        const values = [username];

        connection.query(sql, values, (err, rows) => {
            if (err) {
                console.error('Login error:', err);
                res.status(500).json({ message: 'An error occurred during login' });
            } else if (rows.length === 1) {
                const user = rows[0];
                if (user.password === password) {
                    res.status(200).json({ message: 'Login successful', user: { id: user.id, username, password } });
                } else {
                    res.status(401).json({ message: 'Invalid password' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    } catch (error) {
        console.error('Exception:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});





app.post('/loginStudent', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const sql = 'SELECT * FROM student_user WHERE username = ?';
        const values = [username];

        connection.query(sql, values, (err, rows) => {
            if (err) {
                console.error('Login error:', err);
                res.status(500).json({ message: 'An error occurred during login' });
            } else if (rows.length === 1) {
                const user = rows[0];
                if (user.password === password) {
                    res.status(200).json({ message: 'Login successful', user: { id: user.id, username, password } });
                } else {
                    res.status(401).json({ message: 'Invalid password' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    } catch (error) {
        console.error('Exception:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});




app.post('/loginAdmin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const sql = 'SELECT * FROM admin_user WHERE username = ?';
        const values = [username];

        connection.query(sql, values, (err, rows) => {
            if (err) {
                console.error('Login error:', err);
                res.status(500).json({ message: 'An error occurred during login' });
            } else if (rows.length === 1) {
                const user = rows[0];
                if (user.password === password) {
                    res.status(200).json({ message: 'Login successful', user: { id: user.id, username, password } });
                } else {
                    res.status(401).json({ message: 'Invalid password' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    } catch (error) {
        console.error('Exception:', error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
