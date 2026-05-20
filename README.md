# SyntaxForge - Python Education Platform

SyntaxForge is a premium coding education platform built with Next.js and Node.js. It features a complete 15-module Python curriculum.

## Features
- **15 Python Modules**: Comprehensive content from basics to OOP and Projects.
- **Access Control**: First 2 modules are free; modules 3-15 require registration/login.
- **Premium Design**: Dark mode, glassmorphism, and smooth animations.
- **Node.js Backend**: Authentication service ready for Google Cloud deployment.

## Project Structure
- `/app`: Next.js frontend pages and layouts.
- `/data`: Curriculum data (Python modules).
- `/server`: Node.js backend (Excluded from Git repo).
- `/styles`: Global CSS and design tokens.

## How to Run Locally

### 1. Start the Backend
```bash
cd server
npm install
npm start
```

### 2. Start the Frontend
```bash
npm install
npm run dev
```

## Deployment to Google Cloud (Server)
To deploy the backend to Google Cloud App Engine:
1. Ensure the `server` folder has `app.yaml`.
2. Run `gcloud app deploy`.

## Authors
- Developed by Antigravity AI for wandacoder12
