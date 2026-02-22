
# EduFlow – Intelligent Study Companion

**Live Application:**  
https://eduflow-orpy.onrender.com/

EduFlow is a modern study platform built using the MERN stack. It integrates a Large Language Model (Google Gemini API) to dynamically generate structured study materials including guides, quizzes, and learning roadmaps.

The platform focuses on clean architecture, secure authentication, content persistence, and an engaging study workflow.

---

## Features

### 1. Dynamic Study Material Generation
- Structured Study Guides (Markdown formatted)
- 5-question quizzes with answer keys
- 3-phase learning roadmaps
- Prompt-engineered content generation using Gemini LLM

### 2. Secure Authentication
- JWT-based authentication
- HTTP-only cookies for secure session handling
- Access and refresh token implementation
- Protected routes using middleware

### 3. Study Streak Tracking
- Tracks daily study consistency
- Updates streak based on last activity timestamp
- Encourages habit-based learning

### 4. History Management
- Stores generated content in MongoDB
- Links study materials to individual users
- Personal dashboard for content management

### 5. Modern UI
- Responsive layout
- Dark theme with glass-style aesthetics
- Built using Tailwind CSS and Lucide icons

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router v6
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Google Gemini API (LLM integration)
- JWT
- Cookie-Parser

---

## Project Structure
EduFlow/
├── backend/
│ ├── config/ # Database & Gemini configuration
│ ├── controllers/ # Auth, User, AI generation logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express route definitions
│ ├── middleware/ # Authentication & error handling
│ └── server.js # Entry point
│
└── frontend/
├── src/
│ ├── api/ # Axios instance configuration
│ ├── components/ # Reusable UI components
│ ├── context/ # Global auth state
│ └── pages/ # Application pages
└── tailwind.config.js

Code


---

## System Workflow

1. User enters a study topic in the frontend.
2. Backend verifies authentication using HTTP-only cookies.
3. Server constructs a structured prompt.
4. Prompt is sent to Gemini LLM.
5. Generated Markdown content is stored in MongoDB.
6. Study streak is updated based on user activity.
7. Frontend renders formatted study material dynamically.

---

## Getting Started (Local Setup)

### Prerequisites

- Node.js installed
- MongoDB Atlas account
- Google AI Studio API key

---

### Installation

```bash
# Clone the repository
git clone https://github.com/TanSha15/EduFlow.git

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
Environment Variables
Create a .env file inside the backend directory:

Code

PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
GEMINI_API_KEY=your_google_gemini_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
Deployment
The project is deployed on Render:

Frontend: Hosted as a Static Site with rewrite rule (/* → /index.html)

Backend: Hosted as a Web Service with environment variables configured

Automatic CI/CD via GitHub integration

Key Implementation Highlights
Structured prompt engineering for consistent content output

Cookie-based authentication for improved security

Streak tracking logic based on timestamp comparison

Clean separation of concerns (controllers, routes, middleware)

Centralized Axios configuration on frontend

Future Improvements
Difficulty-based content customization

Export study materials as PDF

Collaborative study rooms

Advanced analytics dashboard

Content tagging and filtering system

Author
Tanish Sharma
MERN Stack Developer
