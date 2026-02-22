
🚀 EduFlow – Intelligent Study Companion
EduFlow is a next-generation study platform that transforms how students interact with complex topics. By leveraging the Google Gemini API, it generates structured, high-quality study materials in seconds—ranging from deep-dive guides to actionable roadmaps.

✨ Features
1. Dynamic Study Material Generation
Study Guides: Academic, prose-heavy deep dives into any topic.

Interactive Quizzes: 5-question multiple-choice quizzes with progressive difficulty and detailed answer keys.

Learning Roadmaps: 3-Phase step-by-step guides with actionable checkpoints.

Prompt Engineering: Fine-tuned AI responses that strictly follow academic formatting rules.

2. Secure Authentication & Session Management
JWT Security: Implementation of Access and Refresh tokens.

HTTP-Only Cookies: Protection against XSS attacks by keeping tokens out of local storage.

Auth Guarding: Higher-order components for protected routes and automatic redirection.

3. Gamification & Persistence
Study Streaks: Real-time logic that tracks daily activity and encourages habit-building.

Material History: Full CRUD capability—generate, view, and delete your study history.

🏗️ Project Structure
Plaintext

EduFlow/
├── backend/
│   ├── config/             # DB (MongoDB) & AI (Gemini) configuration
│   ├── controllers/        # Business logic (AI Generation, Auth, User)
│   ├── models/             # Mongoose Schemas (User, StudyMaterial)
│   ├── routes/             # Express Route definitions
│   ├── middleware/         # Auth verification & Error handling
│   └── server.js           # Server entry point
└── frontend/
    ├── src/
    │   ├── api/            # Axios instance with interceptors
    │   ├── components/     # UI Components (Sidebar, Navbar, Loaders)
    │   ├── context/        # Auth & UI Context Providers
    │   └── pages/          # Dashboard, Login, Signup, Contact
    └── tailwind.config.js  # Styling configuration
🔄 System Workflow
The following diagram illustrates how EduFlow processes an AI request securely:

Frontend: User submits a topic and selects a content type (Quiz/Roadmap/Guide).

Middleware: The server validates the user's JWT from an HTTP-only cookie.

Controller: The backend builds a dynamic prompt and sends it to the Gemini API.

Database: The generated content is stored in MongoDB linked to the user's profile.

Gamification: The system updates the user's streak and lastActivity timestamp.

Response: The UI receives the data and renders the Markdown content using a polished, responsive layout.

🛠️ Tech Stack
Layer	Technology
Frontend	React (Vite), Tailwind CSS, Lucide Icons, React Router 6
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ODM)
AI Integration	Google Gemini 1.5 Flash
Auth	JWT (JSON Web Tokens), Cookie-Parser

Export to Sheets

🚀 Getting Started
1. Clone & Install
Bash

git clone https://github.com/TanSha15/EduFlow.git
cd EduFlow

# Install Backend
cd backend && npm install

# Install Frontend
cd ../frontend && npm install
2. Environment Setup
Create a .env file in the /backend directory:

Code snippet

PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
GEMINI_API_KEY=your_google_ai_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
3. Run the App
Bash

# In backend/
npm run dev

# In frontend/
npm run dev
🌐 Deployment
This project is currently deployed on Render.

Backend: Web Service (Node.js)

Frontend: Static Site (Vite)

Database: MongoDB Atlas
