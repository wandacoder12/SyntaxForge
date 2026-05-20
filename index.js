const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;
const SECRET_KEY = process.env.SECRET_KEY || 'u89u893njkuw9r98q9038uoiewfjkewru9e2rui390483204832iperjwor3243hure3u9r032ur032ut2i9tu048320ruewroewurilewrwe90ru23432op4ek249i023432y98er2or2390832uur89u32y3298ry32yr9823ry238ry329';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve files from the root

// Mock Database
let users = [];

// Modules Data
const pythonModules = [
    { id: 1, title: "1. Welcome to Python", description: "Learn about what Python is and why it's the most popular language today." },
    { id: 2, title: "2. Setting Up Your Environment", description: "Prepare your machine for Python development." },
    { id: 3, title: "3. Variables and Data Types", description: "Storing information using strings, integers, and floats." },
    { id: 4, title: "4. Basic Arithmetic Operators", description: "Mathematical operations within Python." },
    { id: 5, title: "5. Conditional Logic (If-Else)", description: "Making decisions in your code." },
    { id: 6, title: "6. Loops: For and While", description: "Repeating tasks automatically." },
    { id: 7, title: "7. Defining and Using Functions", description: "Breaking your code into reusable blocks." },
    { id: 8, title: "8. Lists and Tuples", description: "Managing collections of data." },
    { id: 9, title: "9. Dictionaries and Sets", description: "Key-value pairs and unique collections." },
    { id: 10, title: "10. Exception Handling", description: "Handling errors gracefully with Try-Except." },
    { id: 11, title: "11. File I/O", description: "Reading and writing files on your system." },
    { id: 12, title: "12. Object-Oriented Programming (I)", description: "Classes and Objects in Python." },
    { id: 13, title: "13. Object-Oriented Programming (II)", description: "Inheritance and Polymorphism." },
    { id: 14, title: "14. Modules and Packages", description: "Organizing code across multiple files." },
    { id: 15, title: "15. The Final Project: CLI App", description: "Build a complete project from scratch." }
];

// Helper to wrap HTML with layout
const wrapHTML = (content, title = 'SyntaxForge') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Master Python Coding</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/globals.css">
</head>
<body class="hero-gradient min-h-screen">
    <header class="fixed top-0 w-full z-50 glass border-b border-zinc-800">
        <nav class="container mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" class="text-2xl font-bold tracking-tighter gradient-text">SyntaxForge</a>
            <div class="flex gap-6 items-center">
                <a href="/" class="text-zinc-400 hover:text-white transition">Courses</a>
                <div id="auth-links" class="flex gap-4 items-center">
                    <a href="/login" class="px-4 py-2 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition text-white">Login</a>
                    <a href="/register" class="px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition">Get Started</a>
                </div>
            </div>
        </nav>
    </header>
    <main class="pt-24 pb-12">
        ${content}
    </main>
    <footer class="border-t border-zinc-800 py-12 bg-zinc-950">
        <div class="container mx-auto px-6 text-center text-zinc-500">
            <p>&copy; 2026 SyntaxForge. All rights reserved.</p>
        </div>
    </footer>
    <script>
        // Check for token and update UI
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('userEmail');
        if (token) {
            document.getElementById('auth-links').innerHTML = \`
                <span class="text-zinc-400 text-sm">\${email}</span>
                <button onclick="logout()" class="text-zinc-400 hover:text-white text-sm">Logout</button>
            \`;
        }
        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            window.location.reload();
        }
    </script>
</body>
</html>
`;

// Routes
app.get('/', (req, res) => {
    const modulesHTML = pythonModules.map((m, i) => `
        <div class="card group cursor-pointer" onclick="window.location.href='/login'">
            <div class="flex justify-between items-start mb-4">
                <span class="text-sm font-mono text-white bg-zinc-800 px-2 py-1 rounded">Module ${i + 1}</span>
                ${i >= 2 ? '<span class="text-xs text-zinc-500 flex items-center gap-1">🔒 Locked</span>' : ''}
            </div>
            <h3 class="text-xl font-bold mb-2 group-hover:text-white transition text-white">${m.title}</h3>
            <p class="text-zinc-400 text-sm">${m.description}</p>
            <div class="mt-6 flex items-center text-sm font-semibold text-white group-hover:gap-2 transition-all">
                Start Learning <span class="group-hover:translate-x-1 transition-transform">→</span>
            </div>
        </div>
    `).join('');

    const content = `
        <div class="container mx-auto px-6">
            <div class="max-w-3xl mb-16">
                <h1 class="text-6xl font-bold mb-6 leading-tight text-white">
                    Level Up Your Skills <br />
                    <span class="gradient-text">Master Python Today</span>
                </h1>
                <p class="text-zinc-400 text-xl leading-relaxed">
                    From variables to complex data science applications, SyntaxForge provides a structured 15-module path to Python mastery.
                </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${modulesHTML}
            </div>
        </div>
    `;
    res.send(wrapHTML(content));
});

app.get('/login', (req, res) => {
    const content = `
        <div class="container mx-auto px-6 flex justify-center py-20">
            <div class="w-full max-w-md glass p-10 rounded-3xl">
                <h2 class="text-3xl font-bold mb-8 text-center text-white">Login to SyntaxForge</h2>
                <div id="error-msg" class="hidden bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm"></div>
                <form id="login-form" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                        <input type="email" id="email" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-white outline-none transition" placeholder="name@example.com" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-zinc-400 mb-2">Password</label>
                        <input type="password" id="password" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-white outline-none transition" placeholder="••••••••" required>
                    </div>
                    <button type="submit" class="w-full px-6 py-4 bg-white hover:bg-zinc-200 text-black rounded-xl font-semibold transition">Sign In</button>
                </form>
                <p class="mt-8 text-center text-zinc-500 text-sm">Don't have an account? <a href="/register" class="text-white hover:underline">Sign up</a></p>
            </div>
        </div>
        <script>
            document.getElementById('login-form').onsubmit = async (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const res = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userEmail', data.email);
                    window.location.href = '/';
                } else {
                    const err = document.getElementById('error-msg');
                    err.innerText = data.message;
                    err.classList.remove('hidden');
                }
            };
        </script>
    `;
    res.send(wrapHTML(content, 'Login'));
});

app.get('/register', (req, res) => {
    const content = `
        <div class="container mx-auto px-6 flex justify-center py-20">
            <div class="w-full max-w-md glass p-10 rounded-3xl">
                <h2 class="text-3xl font-bold mb-8 text-center text-white">Create Account</h2>
                <div id="error-msg" class="hidden bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm"></div>
                <div id="success-msg" class="hidden bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-xl mb-6 text-sm">Registration successful! Redirecting...</div>
                <form id="register-form" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
                        <input type="email" id="email" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-white outline-none transition" placeholder="name@example.com" required>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-zinc-400 mb-2">Password</label>
                        <input type="password" id="password" class="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-white outline-none transition" placeholder="Min. 8 characters" required>
                    </div>
                    <button type="submit" class="w-full px-6 py-4 bg-white hover:bg-zinc-200 text-black rounded-xl font-semibold transition">Create Account</button>
                </form>
                <p class="mt-8 text-center text-zinc-500 text-sm">Already have an account? <a href="/login" class="text-white hover:underline">Sign in</a></p>
            </div>
        </div>
        <script>
            document.getElementById('register-form').onsubmit = async (e) => {
                e.preventDefault();
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                const res = await fetch('/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (res.ok) {
                    document.getElementById('success-msg').classList.remove('hidden');
                    setTimeout(() => window.location.href = '/login', 2000);
                } else {
                    const err = document.getElementById('error-msg');
                    err.innerText = data.message;
                    err.classList.remove('hidden');
                }
            };
        </script>
    `;
    res.send(wrapHTML(content, 'Register'));
});

// API endpoints
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }
    users.push({ email, password });
    res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({ token, email });
        }
        res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).send('Something went wrong on the server.');
});

// Entry point for Cloud Run / Functions
exports.helloHttp = app;

// Start server only if run directly (not as a function)
if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server listening on port ${PORT}`);
    });
}
