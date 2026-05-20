const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8080;
const SECRET_KEY = 'https://server-sf-981505851604.europe-west1.run.app'; // In production, use env variables

app.use(cors());
app.use(bodyParser.json());

// Mock Database
const users = [];

app.get('/', (req, res) => {
    res.send('SyntaxForge Auth Server is Running');
});

// Register
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ email, password });
    res.status(201).json({ message: 'User registered successfully' });
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token, email });
    }
    res.status(401).json({ message: 'Invalid credentials' });
});

// Verify Token Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
        req.user = decoded;
        next();
    });
};

app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Access granted', user: req.user });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});
