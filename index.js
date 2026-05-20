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
    {
        id: 1,
        title: "1. Welcome to Python",
        description: "Learn about what Python is and why it's the most popular language today.",
        content: "<h1>Welcome to Python</h1><p>Python is a high-level, interpreted programming language known for its readability and versatility.</p><h3>Why Python?</h3><ol><li><strong>Easy to Learn</strong>: Simple syntax and readable code.</li><li><strong>Versatile</strong>: Used in Web Dev, Data Science, AI, and Automation.</li><li><strong>Huge Community</strong>: Plenty of documentation and libraries.</li></ol><p>In this module, we will explore the history of Python and its core philosophy: <em>The Zen of Python</em>.</p>"
    },
    {
        id: 2,
        title: "2. Setting Up Your Environment",
        description: "Prepare your machine for Python development.",
        content: "<h1>Environment Setup</h1><p>Before we start coding, we need to install Python and a code editor.</p><h3>Steps:</h3><ol><li>Download Python from <a href='https://python.org'>python.org</a>.</li><li>Install Visual Studio Code (Recommended).</li><li>Install the Python Extension for VS Code.</li></ol><p>Test your installation by typing <code>python --version</code> in your terminal.</p>"
    },
    {
        id: 3,
        title: "3. Variables and Data Types",
        description: "Storing information using strings, integers, and floats.",
        content: "<h1>Variables and Data Types</h1><p>Variables are containers for storing data values.</p><pre><code>name = 'SyntaxForge'\\nage = 25\\nprice = 19.99\\nis_active = True</code></pre><p>Common types include <code>int</code>, <code>str</code>, <code>float</code>, and <code>bool</code>.</p>"
    },
    {
        id: 4,
        title: "4. Basic Arithmetic Operators",
        description: "Mathematical operations within Python.",
        content: "<h1>Basic Operators</h1><p>Python can be used as a powerful calculator.</p><pre><code>a = 10\\nb = 3\\n\\nprint(a + b) # Addition\\nprint(a - b) # Subtraction\\nprint(a * b) # Multiplication\\nprint(a / b) # Division\\nprint(a % b) # Modulo (Remainder)</code></pre>"
    },
    {
        id: 5,
        title: "5. Conditional Logic (If-Else)",
        description: "Making decisions in your code.",
        content: "<h1>Control Flow: If-Else</h1><p>Use conditional statements to execute code based on conditions.</p><pre><code>score = 85\\n\\nif score >= 90:\\n    print('A')\\nelif score >= 80:\\n    print('B')\\nelse:\\n    print('C')</code></pre>"
    },
    {
        id: 6,
        title: "6. Loops: For and While",
        description: "Repeating tasks automatically.",
        content: "<h1>Loops</h1><p>Loops are used to iterate over a sequence.</p><h3>For Loop</h3><pre><code>for i in range(5):\\n    print(f'Count: {i}')</code></pre><h3>While Loop</h3><pre><code>count = 0\\nwhile count < 5:\\n    print(count)\\n    count += 1</code></pre>"
    },
    {
        id: 7,
        title: "7. Defining and Using Functions",
        description: "Breaking your code into reusable blocks.",
        content: "<h1>Functions</h1><p>A function is a block of code which only runs when it is called.</p><pre><code>def greet(name):\\n    return f'Hello, {name}!'\\n\\nmessage = greet('Student')\\nprint(message)</code></pre>"
    },
    {
        id: 8,
        title: "8. Lists and Tuples",
        description: "Managing collections of data.",
        content: "<h1>Lists and Tuples</h1><p>Lists are mutable collections, while Tuples are immutable.</p><pre><code>fruits = ['apple', 'banana', 'cherry']\\nfruits.append('orange')\\n\\ncoordinates = (10, 20)</code></pre>"
    },
    {
        id: 9,
        title: "9. Dictionaries and Sets",
        description: "Key-value pairs and unique collections.",
        content: "<h1>Dictionaries</h1><p>Dictionaries store data in key:value pairs.</p><pre><code>user = {\\n    'name': 'Wanda',\\n    'level': 10\\n}\\nprint(user['name'])</code></pre>"
    },
    {
        id: 10,
        title: "10. Exception Handling",
        description: "Handling errors gracefully with Try-Except.",
        content: "<h1>Error Handling</h1><p>Prevent your program from crashing when an error occurs.</p><pre><code>try:\\n    result = 10 / 0\\nexcept ZeroDivisionError:\\n    print('You cannot divide by zero!')</code></pre>"
    },
    {
        id: 11,
        title: "11. File I/O",
        description: "Reading and writing files on your system.",
        content: "<h1>File Handling</h1><pre><code>with open('test.txt', 'w') as f:\\n    f.write('Hello SyntaxForge!')\\n\\nwith open('test.txt', 'r') as f:\\n    print(f.read())</code></pre>"
    },
    {
        id: 12,
        title: "12. Object-Oriented Programming (I)",
        description: "Classes and Objects in Python.",
        content: "<h1>OOP: Classes</h1><p>Classes provide a means of bundling data and functionality together.</p><pre><code>class Dog:\\n    def __init__(self, name):\\n        self.name = name\\n\\nmy_dog = Dog('Buddy')\\nprint(my_dog.name)</code></pre>"
    },
    {
        id: 13,
        title: "13. Object-Oriented Programming (II)",
        description: "Inheritance and Polymorphism.",
        content: "<h1>OOP: Inheritance</h1><p>Inheritance allows us to define a class that inherits all the methods and properties from another class.</p><pre><code>class Animal:\\n    def speak(self):\\n        pass\\n\\nclass Cat(Animal):\\n    def speak(self):\\n        return 'Meow'</code></pre>"
    },
    {
        id: 14,
        title: "14. Modules and Packages",
        description: "Organizing code across multiple files.",
        content: "<h1>Modules</h1><p>Import built-in modules or your own files.</p><pre><code>import math\\nprint(math.sqrt(16))\\n\\nfrom datetime import datetime\\nprint(datetime.now())</code></pre>"
    },
    {
        id: 15,
        title: "15. The Final Project: CLI App",
        description: "Build a complete project from scratch.",
        content: "<h1>Final Project</h1><p>Let's build a Task Manager CLI App that utilizes all the concepts learned:</p><ul><li>Variables and Lists to store tasks</li><li>Functions to add/remove tasks</li><li>File handling to save tasks permanently</li><li>Error handling for invalid inputs</li></ul>"
    }
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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="hero-gradient min-h-screen pb-20 md:pb-0">
    <!-- Desktop Header -->
    <header class="fixed top-0 w-full z-50 glass border-b border-zinc-800 hidden md:block">
        <nav class="container mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" class="text-2xl font-bold tracking-tighter gradient-text">SyntaxForge</a>
            <div class="flex gap-6 items-center">
                <a href="/" class="text-zinc-400 hover:text-white transition">Courses</a>
                <div id="auth-links-desktop" class="flex gap-4 items-center">
                    <a href="/login" class="px-4 py-2 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition text-white">Login</a>
                    <a href="/register" class="px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition">Get Started</a>
                </div>
            </div>
        </nav>
    </header>

    <!-- Mobile Top Header -->
    <header class="fixed top-0 w-full z-50 glass border-b border-zinc-800 md:hidden p-4 flex justify-between items-center">
        <a href="/" class="text-xl font-bold tracking-tighter gradient-text">SyntaxForge</a>
        <div id="auth-status-mobile" class="text-xs text-zinc-500"></div>
    </header>

    <!-- Mobile Bottom Nav -->
    <nav class="fixed bottom-0 left-0 right-0 z-50 glass border-t border-zinc-800 md:hidden flex justify-around items-center py-3">
        <a href="/" class="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition">
            <i class="fas fa-home text-lg"></i>
            <span class="text-[10px] uppercase font-bold tracking-widest">Home</span>
        </a>
        <a href="/login" id="nav-login" class="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition">
            <i class="fas fa-sign-in-alt text-lg"></i>
            <span class="text-[10px] uppercase font-bold tracking-widest">Login</span>
        </a>
        <a href="/register" id="nav-register" class="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition">
            <i class="fas fa-user-plus text-lg"></i>
            <span class="text-[10px] uppercase font-bold tracking-widest">Register</span>
        </a>
        <button onclick="logout()" id="nav-logout" class="hidden flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition">
            <i class="fas fa-sign-out-alt text-lg"></i>
            <span class="text-[10px] uppercase font-bold tracking-widest">Logout</span>
        </button>
    </nav>

    <main class="pt-20 md:pt-24 pb-12">
        ${content}
    </main>

    <footer class="border-t border-zinc-800 py-12 bg-zinc-950 hidden md:block">
        <div class="container mx-auto px-6 text-center text-zinc-500">
            <p>&copy; 2026 SyntaxForge. All rights reserved.</p>
        </div>
    </footer>

    <script>
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('userEmail');

        function updateAuthUI() {
            if (token) {
                // Desktop
                const desktopLinks = document.getElementById('auth-links-desktop');
                if (desktopLinks) {
                    desktopLinks.innerHTML = \`
                        <span class="text-zinc-400 text-sm">\${email}</span>
                        <button onclick="logout()" class="text-zinc-400 hover:text-white text-sm">Logout</button>
                    \`;
                }
                // Mobile
                const mobileStatus = document.getElementById('auth-status-mobile');
                if (mobileStatus) mobileStatus.innerText = email.split('@')[0];

                const navLogin = document.getElementById('nav-login');
                const navRegister = document.getElementById('nav-register');
                const navLogout = document.getElementById('nav-logout');
                
                if (navLogin) navLogin.classList.add('hidden');
                if (navRegister) navRegister.classList.add('hidden');
                if (navLogout) navLogout.classList.remove('hidden');
            }
        }

        function logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            window.location.href = '/';
        }

        updateAuthUI();
    </script>
</body>
</html>
`;

// Routes
app.get('/', (req, res) => {
    const modulesHTML = pythonModules.map((m, i) => `
        <div class="card group cursor-pointer module-card" data-id="\${m.id}" data-locked="\${i >= 2}">
            <div class="flex justify-between items-start mb-4">
                <span class="text-sm font-mono text-white bg-zinc-800 px-2 py-1 rounded">Module ${i + 1}</span>
                <span class="lock-icon text-xs text-zinc-500 flex items-center gap-1 \${i < 2 ? 'hidden' : ''}">🔒 Locked</span>
                <span class="unlock-icon text-xs text-green-500 flex items-center gap-1 hidden">🔓 Unlocked</span>
            </div>
            <h3 class="text-xl font-bold mb-2 group-hover:text-white transition text-white">${m.title}</h3>
            <p class="text-zinc-400 text-sm">${m.description}</p>
            <div class="mt-6 flex items-center text-sm font-semibold text-white group-hover:gap-2 transition-all">
                <span class="action-text">Login to Start</span> <span class="group-hover:translate-x-1 transition-transform">→</span>
            </div>
        </div>
    `).join('');

    const content = `
        <div class="container mx-auto px-6">
            <div class="max-w-3xl mb-12 md:mb-16">
                <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
                    Level Up Your Skills <br />
                    <span class="gradient-text">Master Python Today</span>
                </h1>
                <p class="text-zinc-400 text-lg md:text-xl leading-relaxed">
                    From variables to complex data science applications, SyntaxForge provides a structured 15-module path to Python mastery.
                </p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                ${modulesHTML}
            </div>
        </div>
        <script>
            document.querySelectorAll('.module-card').forEach(card => {
                const isLocked = card.getAttribute('data-locked') === 'true';
                const id = card.getAttribute('data-id');
                const token = localStorage.getItem('token');

                if (token) {
                    card.querySelector('.lock-icon').classList.add('hidden');
                    card.querySelector('.unlock-icon').classList.remove('hidden');
                    card.querySelector('.action-text').innerText = 'Start Learning';
                    card.onclick = () => window.location.href = '/course/' + id;
                } else {
                    if (isLocked) {
                        card.onclick = () => window.location.href = '/login?redirect=' + id;
                    } else {
                        card.onclick = () => window.location.href = '/course/' + id;
                    }
                }
            });
        </script>
    `;
    res.send(wrapHTML(content));
});

app.get('/course/:id', (req, res) => {
    const moduleId = parseInt(req.params.id);
    const module = pythonModules.find(m => m.id === moduleId);

    if (!module) return res.send(wrapHTML('<div class="container mx-auto px-6 text-white pt-20">Module not found</div>'));

    const content = `
        <div class="container mx-auto px-6">
            <div class="mb-8">
                <a href="/" class="text-zinc-500 hover:text-white transition flex items-center gap-2 mb-4">
                    <i class="fas fa-arrow-left"></i> Back to Courses
                </a>
                <h1 class="text-4xl font-bold text-white mb-4">${module.title}</h1>
                <p class="text-zinc-400 text-lg">${module.description}</p>
            </div>
            <div class="glass p-8 md:p-12 rounded-3xl text-zinc-300 leading-relaxed max-w-4xl">
                <div class="prose prose-invert max-w-none">
                    ${module.content || 'Content for this module is coming soon!'}
                </div>
                <div class="mt-12 flex justify-between items-center border-t border-zinc-800 pt-8">
                    <div class="text-zinc-500">Module ${moduleId} of 15</div>
                    <a href="${moduleId < 15 ? '/course/' + (moduleId + 1) : '#'}" class="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition">
                        Next Module <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
        <script>
            if (!localStorage.getItem('token') && ${moduleId} > 2) {
                window.location.href = '/login?redirect=${moduleId}';
            }
        </script>
    `;
    res.send(wrapHTML(content, module.title));
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
                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect');

                const res = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userEmail', data.email);
                    window.location.href = redirect ? '/course/' + redirect : '/';
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
