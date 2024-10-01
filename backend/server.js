const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true
}));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'shahin124',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1800000, 
        httpOnly: true,
        secure: false, // Set to false because your app uses HTTP
        sameSite: 'lax' // Suitable for cross-site requests (like APIs)
    }
}));

const noCacheMiddleware = (req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', 'Thu, 01 Jan 1970 00:00:00 GMT');
    next();
};

app.use(noCacheMiddleware);
app.use(express.static(path.join(__dirname, 'public')));

const port = 5000;
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'caremate',
});
connection.connect((err) => {
    if (err) {
        console.log("Connection with MySQL failed", err);
    } else {
        console.log("Connection established successfully");
    }
});

// Registration Route
app.post('/register', async (req, res) => {
    const { phoneNumber, firstName, email } = req.body;
    const sql = 'INSERT INTO users(phone_number, first_name, email) VALUES (?, ?, ?)';
    connection.query(sql, [phoneNumber, firstName, email], (err, results) => {
        if (err) {
            throw err;
        } else {
            res.status(200).send('Registration successful');
        }
    });
});

// POST: Send OTP
app.post('/send-otp', (req, res) => {
    const { phoneNumber } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP

    const query = 'SELECT id, email FROM users WHERE phone_number = ?'; // Include email in the query
    connection.query(query, [phoneNumber], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userId = result[0].id;
        console.log(`OTP for ${phoneNumber}: ${otp}`); // Log OTP to console (replace with actual sending logic)

        // Store OTP and email in session
        req.session.otp = otp;
        req.session.userId = userId; // Store the user ID in the session

        res.status(200).json({ message: 'OTP sent' });
    });
});

// POST: Verify OTP and login
app.post('/login', (req, res) => {
    const { otp } = req.body;

    if (req.session.otp && req.session.otp === parseInt(otp)) {
        // OTP is valid, login the user
        req.session.isLoggedIn = true;
        console.log(req.session);
        res.status(200).json({ message: 'Login successful', userId: req.session.userId });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});

app.get('/searchUser/:id', (req, res) => {
    const userId = parseInt(req.params.id);
     
    const query = 'SELECT id, first_name AS firstName,email FROM users WHERE id = ?';
    connection.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else if (result.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(result[0]);
      }
    });
  });
  app.post('/sendRequest', (req, res) => {
    console.log('Request received:', req.body); // Log the entire request body
    const recipientId = parseInt(req.body.recipientId);
    const senderId = req.session.userId;

    console.log("Sender ID:", senderId); // Log sender ID
    console.log("Recipient ID:", recipientId);

    const query = 'INSERT INTO user_requests (sender_id, receiver_id, request_status) VALUES (?, ?, ?)';
    connection.query(query, [senderId, recipientId, 'pending'], (err, result) => {
        if (err) {
            console.error('Error sending request:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.status(200).json({ message: 'Request sent successfully' });
    });
});
app.get('/fetchRequests', (req, res) => {
    const userId = req.session.userId; // Get the logged-in user's ID
    const query = 'SELECT * FROM user_requests WHERE receiver_id = ? AND request_status = ?';
    
    connection.query(query, [userId, 'pending'], (err, results) => {
        if (err) {
            console.error('Error fetching requests:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results); // Return the list of pending requests
    });
});
app.post('/acceptRequest', (req, res) => {
    const { requestId } = req.body; // Get the request ID from the request body
    const query = 'UPDATE user_requests SET request_status = ? WHERE request_id = ?'; // Update the correct field

    connection.query(query, ['accepted', requestId], (err, result) => {
        if (err) {
            console.error('Error accepting request:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (result.affectedRows === 0) { // Check if the update was successful
            return res.status(404).json({ error: 'Request not found or already accepted.' });
        }
        res.status(200).json({ message: 'Request accepted successfully' });
    });
});

app.get('/checkRequestStatus/:recipientId', (req, res) => {
    const recipientId = parseInt(req.params.recipientId);
    const query = 'SELECT request_status FROM user_requests WHERE sender_id = ? OR receiver_id=?'; // Adjust table name and column as needed

    connection.query(query, [recipientId,recipientId], (err, results) => {
        if (err) {
            console.error('Error fetching request status:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Assuming request_status can be 'accepted' or 'pending'
        if (results.length > 0 && results[0].request_status === 'accepted') {
            res.status(200).json({ requestAccepted: true });
        } else {
            res.status(200).json({ requestAccepted: false });
        }
    });
});

// Fetch tasks for a specific user
app.get('/fetchUserTasks/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const query = 'SELECT task_description,scheduled_time FROM tasks WHERE user_id = ?'; // Adjust table name as needed

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user tasks:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(results); // Return all tasks for the user
    });
});

// Add a task for a specific user
app.post('/addTask', (req, res) => {
    const { userId, taskDetails,scheduledTime} = req.body;
    const query = 'INSERT INTO tasks (user_id, task_description,scheduled_time) VALUES (?, ?,?)'; // Adjust table name as needed

    connection.query(query, [userId, taskDetails,scheduledTime], (err, results) => {
        if (err) {
            console.error('Error adding task:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Task added successfully!' }); // Return success message
    });
});
// Route to add a task
app.post('/tasks', (req, res) => {
    const user_id = req.session.userId;
    const { task_description, scheduled_time } = req.body;
    const sql = 'INSERT INTO tasks (user_id, task_description, scheduled_time) VALUES (?, ?, ?)';
    connection.query(sql, [user_id, task_description, scheduled_time], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId, user_id, task_description, scheduled_time });
    });
});

// Route to get tasks for a specific user
app.get('/tasks', (req, res) => {
    const user_id = req.session.userId;
    const sql = 'SELECT * FROM tasks WHERE user_id = ?';
    connection.query(sql, [user_id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
