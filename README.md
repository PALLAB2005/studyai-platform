# 🎓 StudyAI — AI-Powered Student Learning Platform

> An AI-powered, YouTube-based student learning platform that helps students learn any subject, prepare for exams, improve job-ready skills, generate quizzes, track learning progress, and receive personalized study assistance.

---

## 📌 Table of Contents:

- About StudyAI
- Problem Statement
- Solution
- Key Features
- AI Features
- Learning Management
- System Architecture
- Project Structure
- Frontend Structure
- Backend Structure
- YouTube Integration
- Authentication
- Database Structure
- API Endpoints
- Technology Stack
- Installation
- Environment Variables
- Running the Project
- Security
- Deployment
- Future Improvements

---

# 📖 About StudyAI:

**StudyAI** is an AI-powered student learning platform designed to provide a centralized environment for learning, exam preparation, skill development, career preparation, and productivity.

Unlike traditional learning platforms that manually upload and maintain courses, StudyAI uses **real educational content from YouTube**.

A student can search for almost any topic, including:

- Web Development
- Python
- React JS
- Java
- Data Structures and Algorithms
- DBMS
- Artificial Intelligence
- Machine Learning
- Mathematics
- Science
- Competitive Exams
- Interview Preparation
- Career Skills
- Academic Subjects

The student's exact search query is sent to the Python FastAPI backend. The backend searches the YouTube Data API and returns relevant videos.

Example:

```text
Student Search
      ↓
"React JS in Bengali"
      ↓
React Frontend
      ↓
FastAPI Backend
      ↓
YouTube Data API
      ↓
Relevant Real Videos
      ↓
Display Inside StudyAI
```

Students can watch the selected video inside the StudyAI platform using the official YouTube embedded player.

---

# ❗ Problem Statement:

Students often face several problems while learning online.

## 1. Too Much Content

YouTube contains millions of educational videos.

When a student searches:

```text
Python Tutorial
```

Thousands of videos may appear.

The student must decide:

- Which tutorial is best?
- Which language should they choose?
- Is the content beginner-friendly?
- Is the tutorial complete?
- Is the content relevant to their exam or career?
- What should they learn next?

---

## 2. Multiple Platforms:

Students often use different platforms for different activities.

| Requirement | Platform Type |
|---|---|
| Video Learning | YouTube |
| Notes | Notes App |
| Quiz | Quiz Platform |
| Exam Preparation | Another Website |
| Career Guidance | Another Platform |
| Study Planning | Calendar / Planner |

This creates a fragmented learning experience.

---

## 3. Lack of Personalized Assistance:

Students often have questions such as:

- What should I study next?
- Which topic is important for my exam?
- What are my weak topics?
- How should I prepare for an interview?
- Which skills do I need for a job?
- Which videos should I watch?

StudyAI aims to solve these problems by combining learning content, AI assistance, quizzes, study planning, and career guidance in one platform.

---

# 💡 Solution:

StudyAI combines:

```text
YouTube Learning
        +
AI Study Assistant
        +
AI Quiz Generator
        +
Weak Topic Analysis
        +
Exam Preparation
        +
Career Guidance
        +
Interview Preparation
        +
Study Planner
        +
Bookmarks
        +
Personal Notes
        +
Learning Progress
```

into one centralized student learning platform.

---

# ✨ Key Features:

## 🎥 YouTube-Powered Learning

StudyAI does not depend on manually uploaded courses.

Instead, students can search for any learning topic.

Examples:

```text
Web Development
React JS
Python in Bengali
Java Tutorial
DBMS Normalization
Machine Learning
Data Structures
UPSC History
Java Interview Questions
Frontend Developer Roadmap
```

The exact search query is sent to the backend.

The backend communicates with the YouTube Data API and returns relevant real videos.

---

## 🔍 Smart Search:

Search flow:

```text
Student
   ↓
Search Topic
   ↓
SearchBar.tsx
   ↓
youtubeService.ts
   ↓
FastAPI API
   ↓
youtube_service.py
   ↓
YouTube Data API
   ↓
Real Video Results
   ↓
Video Cards
```

Search results are dynamically generated based on the student's query.

No hardcoded video list should be used.

---

## 📺 Watch Videos Inside the Platform:

When a student clicks a video:

```text
Video Card
    ↓
/video/:videoId
    ↓
VideoPage
    ↓
YouTube Embedded Player
```

The student can watch the video without leaving the StudyAI learning interface.

The video page includes:

- Video Player
- Video Title
- Channel Name
- Video Description
- Bookmark Button
- Personal Notes
- Related Videos
- AI Quiz
- Learning Progress
- Watch History

---

## 🌐 Language Filter:

Students can filter search results by language.

Supported options:

- All Languages
- English
- Hindi
- Bengali
- Other

Example:

```text
Search: Python

Language: Bengali
```

The system will prioritize relevant Bengali videos.

---

## ⏱️ Duration Filter

Students can filter videos based on duration.

```text
Short
Medium
Long
```

Use cases:

- Short → Quick revision
- Medium → Topic learning
- Long → Complete course

---

## 📊 Sorting

Search results can be sorted by:

- Relevance
- Newest
- Popularity

---

# 🤖 AI Features

## 🧠 AI Study Assistant

Students can ask questions about any topic.

Examples:

```text
Explain React Hooks
```

```text
What is DBMS Normalization?
```

```text
Explain Python Functions in simple language
```

The AI assistant can:

- Explain difficult concepts
- Simplify topics
- Provide examples
- Answer student questions
- Suggest related topics
- Suggest what to study next
- Recommend YouTube learning topics

---

## 📝 AI Quiz Generator:

Students can generate quizzes after learning a topic.

Example:

```text
Topic: DBMS Normalization

Difficulty: Intermediate

Questions: 10
```

The AI can generate:

- Multiple-choice questions
- Topic-based questions
- Beginner questions
- Intermediate questions
- Advanced questions

---

## 📉 Weak Topic Analysis

After a student submits a quiz, the platform analyzes performance.

Example:

```text
Topic Performance

DBMS Normalization    40%
SQL Queries           85%
Database Keys         55%
```

The system can identify weak areas and recommend:

- Topics to revise
- Additional learning videos
- Practice quizzes

---

# 🎯 Exam Preparation

Students can enter:

- Exam Name
- Exam Date
- Subjects
- Available Study Time

StudyAI can provide:

- Important topics
- Study priorities
- Revision plans
- Daily study tasks
- Last-minute suggestions
- Weak topic recommendations

Example flow:

```text
Exam Details
      ↓
AI Analysis
      ↓
Important Topics
      ↓
Study Plan
      ↓
Recommended Videos
      ↓
Quiz & Revision
```

---

# 💼 Career Assistant:

Students can select a career goal.

Examples:

```text
Frontend Developer
Backend Developer
Full Stack Developer
Data Analyst
Machine Learning Engineer
Software Developer
```

The AI can analyze:

```text
Current Skills
       ↓
Required Skills
       ↓
Skill Gap Analysis
       ↓
Learning Roadmap
       ↓
Recommended Topics
       ↓
Relevant YouTube Videos
```

---

# 🎤 Interview Preparation:

StudyAI can assist students with job preparation.

Features can include:

- Technical Questions
- HR Questions
- Topic-based Interview Questions
- Mock Interview Preparation
- AI Feedback
- Weak Area Identification
- Recommended Learning Videos

---

# 📚 Learning Management:

## 🔖 Bookmarks

Students can save useful videos.

Example:

```text
React Complete Course
```

Saved inside:

```text
My Bookmarks
```

---

## 📝 Personal Notes:

Students can create notes while watching a video.

Example:

```text
React useEffect

Used for handling side effects such as API calls,
timers, and subscriptions.
```

Notes can be connected to specific videos.

---

## 🕒 Watch History:

The platform stores recently watched videos.

Example:

```text
Recently Watched

1. React JS Tutorial
2. Python Functions
3. DBMS Normalization
```

---

## 📈 Learning Progress:

Students can track:

- In Progress
- Paused
- Completed
- Recently Watched

Dashboard example:

```text
Learning Progress

Completed: 12
In Progress: 5
Paused: 3
Bookmarked: 18
```

---

# 🗓️ Study Planner

Students can create:

- Daily Study Plans
- Weekly Study Plans
- Revision Tasks
- Learning Tasks

Example:

```text
Monday

✓ Learn React Components
✓ Watch React Hooks Tutorial
○ Complete React Quiz
○ Review Weak Topics
```

---

# 🏗️ System Architecture

StudyAI follows a separated frontend and backend architecture.

```text
┌─────────────────────────────────┐
│                                 │
│        React Frontend           │
│                                 │
│ React + TypeScript + Vite       │
│ Tailwind CSS                    │
│                                 │
└───────────────┬─────────────────┘
                │
                │ HTTP / REST API
                ▼
┌─────────────────────────────────┐
│                                 │
│        FastAPI Backend          │
│                                 │
│ Authentication                  │
│ YouTube Service                 │
│ AI Service                      │
│ Quiz Service                    │
│ Study Planner                   │
│ Career Service                  │
│                                 │
└──────────┬───────────────┬──────┘
           │               │
           ▼               ▼
    ┌─────────────┐   ┌───────────────┐
    │   MongoDB   │   │ YouTube API   │
    └─────────────┘   └───────────────┘
```

---

# 📁 Complete Project Structure

```text
studyai-platform/
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Loader.tsx
│   │   │   │   └── ThemeToggle.tsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── DashboardLayout.tsx
│   │   │   │
│   │   │   ├── youtube/
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   ├── SearchResults.tsx
│   │   │   │   ├── VideoCard.tsx
│   │   │   │   ├── VideoPlayer.tsx
│   │   │   │   ├── VideoFilters.tsx
│   │   │   │   ├── LanguageFilter.tsx
│   │   │   │   ├── RelatedVideos.tsx
│   │   │   │   └── LoadMoreVideos.tsx
│   │   │   │
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── quiz/
│   │   │   ├── assistant/
│   │   │   ├── bookmarks/
│   │   │   ├── notes/
│   │   │   ├── exam/
│   │   │   ├── career/
│   │   │   └── planner/
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Learn.tsx
│   │   │   ├── VideoPage.tsx
│   │   │   ├── Quiz.tsx
│   │   │   ├── Assistant.tsx
│   │   │   ├── Bookmarks.tsx
│   │   │   ├── Notes.tsx
│   │   │   ├── ExamReady.tsx
│   │   │   ├── Career.tsx
│   │   │   ├── Interview.tsx
│   │   │   ├── Planner.tsx
│   │   │   └── Settings.tsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── ThemeContext.tsx
│   │   │   └── LearningContext.tsx
│   │   │
│   │   ├── hooks/
│   │   │
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   ├── youtubeService.ts
│   │   │   ├── quizService.ts
│   │   │   ├── noteService.ts
│   │   │   ├── bookmarkService.ts
│   │   │   ├── examService.ts
│   │   │   ├── careerService.ts
│   │   │   └── plannerService.ts
│   │   │
│   │   ├── types/
│   │   │   ├── user.ts
│   │   │   ├── youtube.ts
│   │   │   ├── quiz.ts
│   │   │   └── study.ts
│   │   │
│   │   ├── utils/
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.tsx
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   │
│   ├── app/
│   │   │
│   │   ├── main.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   │
│   │   ├── api/
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── youtube.py
│   │   │   ├── bookmarks.py
│   │   │   ├── notes.py
│   │   │   ├── quiz.py
│   │   │   ├── assistant.py
│   │   │   ├── exam.py
│   │   │   ├── career.py
│   │   │   └── planner.py
│   │   │
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── bookmark.py
│   │   │   ├── note.py
│   │   │   ├── quiz.py
│   │   │   ├── watch_history.py
│   │   │   └── study_task.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── user.py
│   │   │   ├── auth.py
│   │   │   ├── youtube.py
│   │   │   ├── bookmark.py
│   │   │   ├── note.py
│   │   │   └── quiz.py
│   │   │
│   │   ├── services/
│   │   │   ├── youtube_service.py
│   │   │   ├── auth_service.py
│   │   │   ├── ai_service.py
│   │   │   ├── quiz_service.py
│   │   │   ├── exam_service.py
│   │   │   ├── career_service.py
│   │   │   └── planner_service.py
│   │   │
│   │   └── utils/
│   │       ├── helpers.py
│   │       └── responses.py
│   │
│   ├── requirements.txt
│   ├── .env
│   └── README.md
│
├── .gitignore
├── README.md
└── package.json
```

---

# 🎨 Frontend Architecture

The frontend is responsible for:

- User Interface
- Authentication Pages
- Dashboard
- Search
- Video Display
- Quiz Interface
- AI Assistant Interface
- Bookmarks
- Notes
- Study Planner
- Theme Switching

## Important Folders

### `components/`

Contains reusable components.

Example:

```text
VideoCard.tsx
```

This component displays:

- Video Thumbnail
- Video Title
- Channel Name
- Duration
- View Information

It can be reused in:

- Search Results
- Dashboard
- Related Videos
- AI Recommendations

---

### `pages/`

Contains complete application pages.

Example:

```text
Learn.tsx
```

Responsibilities:

- Search input
- Search filters
- Search results
- Pagination

---

### `services/`

Handles backend API communication.

Example:

```text
youtubeService.ts
```

Functions:

```text
searchVideos()
getVideo()
getRelatedVideos()
```

This keeps API logic separate from UI components.

---

### `context/`

Stores global application state.

Examples:

```text
Authentication
Theme
User Information
Learning Progress
```

---

# ⚙️ Backend Architecture

The backend uses Python and FastAPI.

The backend is responsible for:

- Authentication
- JWT Token Generation
- Database Operations
- YouTube API Requests
- AI Processing
- Quiz Generation
- Bookmarks
- Notes
- Watch History
- Study Planning
- Career Analysis

---

## `main.py`

This is the main entry point.

Responsibilities:

- Create FastAPI application
- Configure CORS
- Register API routers
- Configure middleware
- Start the application

---

## `api/`

Contains API route definitions.

Example:

```text
youtube.py
```

Example endpoint:

```text
GET /api/youtube/search?q=React
```

The API route receives the request and passes it to the appropriate service.

---

## `services/`

Contains the main business logic.

Example:

```text
youtube_service.py
```

Flow:

```text
Receive Search Query
        ↓
Validate Query
        ↓
Call YouTube API
        ↓
Process Results
        ↓
Fetch Video Metadata
        ↓
Format Response
        ↓
Return JSON
```

---

## `schemas/`

Contains Pydantic models.

Used for:

- Request Validation
- Response Validation
- Type Safety

Examples:

```text
LoginRequest
RegisterRequest
VideoResponse
BookmarkRequest
QuizRequest
```

---

## `models/`

Contains database-related models and data structures.

Possible collections:

```text
users
bookmarks
notes
watch_history
quizzes
quiz_attempts
study_tasks
exam_plans
career_plans
```

---

# 📺 YouTube Integration

YouTube integration is one of the core features.

Flow:

```text
Student Search

"React JS in Bengali"

        ↓

SearchBar.tsx

        ↓

youtubeService.searchVideos()

        ↓

GET /api/youtube/search

        ↓

FastAPI youtube.py

        ↓

youtube_service.py

        ↓

YouTube Data API

        ↓

Real YouTube Videos

        ↓

Structured JSON Response

        ↓

VideoCard.tsx
```

---

## YouTube Search Endpoint

```text
GET /api/youtube/search
```

Example:

```text
/api/youtube/search?q=React%20JS
```

With filters:

```text
/api/youtube/search?q=React%20JS&language=bn&duration=long&order=relevance
```

---

## Search Response

```json
{
  "success": true,
  "query": "React JS in Bengali",
  "videos": [
    {
      "video_id": "example123",
      "title": "React JS Complete Course in Bengali",
      "channel_name": "Example Channel",
      "thumbnail": "https://example.com/thumbnail.jpg",
      "description": "Complete React JS tutorial.",
      "duration": "PT2H30M",
      "view_count": 150000,
      "published_at": "2026-01-10",
      "embed_url": "https://www.youtube.com/embed/example123"
    }
  ],
  "next_page_token": "example-token"
}
```

---

# ▶️ Video Playback

When a student clicks a video:

```text
/video/:videoId
```

The frontend displays the video using the official YouTube embed URL.

Example:

```text
https://www.youtube.com/embed/VIDEO_ID
```

The student remains inside StudyAI while learning.

---

# 🔐 Authentication

Authentication flow:

```text
Student
   ↓
Login / Signup
   ↓
FastAPI Authentication API
   ↓
Validate Credentials
   ↓
Password Verification
   ↓
Generate JWT Token
   ↓
Authenticated Session
```

Protected features:

- Bookmarks
- Notes
- Quiz History
- Watch History
- Study Planner
- Exam Plans
- Career Plans
- User Profile

Passwords must be hashed using a secure password hashing system.

---

# 🗄️ Database Structure

StudyAI uses MongoDB.

## Users Collection

```json
{
  "_id": "user_id",
  "name": "Student Name",
  "email": "student@example.com",
  "password_hash": "hashed_password",
  "created_at": "2026-08-26"
}
```

Passwords must never be stored as plain text.

---

## Bookmarks Collection

```json
{
  "_id": "bookmark_id",
  "user_id": "user_id",
  "video_id": "youtube_video_id",
  "title": "React JS Tutorial",
  "thumbnail": "thumbnail_url",
  "created_at": "2026-08-26"
}
```

---

## Watch History Collection

```json
{
  "_id": "history_id",
  "user_id": "user_id",
  "video_id": "youtube_video_id",
  "watch_progress": 65,
  "status": "in_progress",
  "last_watched_at": "2026-08-26"
}
```

---

# 🔌 API Endpoints

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

---

## YouTube

```text
GET /api/youtube/search
GET /api/youtube/video/{video_id}
GET /api/youtube/related/{video_id}
```

---

## Bookmarks

```text
GET    /api/bookmarks
POST   /api/bookmarks
DELETE /api/bookmarks/{id}
```

---

## Notes

```text
GET    /api/notes
POST   /api/notes
PUT    /api/notes/{id}
DELETE /api/notes/{id}
```

---

## Quiz

```text
POST /api/quiz/generate
POST /api/quiz/{quiz_id}/submit
GET  /api/quiz/history
```

---

## AI Assistant

```text
POST /api/assistant/ask
GET  /api/assistant/sessions
```

---

## Exam Preparation

```text
POST /api/exam/generate-plan
GET  /api/exam/plans
```

---

## Career

```text
POST /api/career/analyze
GET  /api/career/plans
```

---

## Study Planner

```text
GET    /api/planner/tasks
POST   /api/planner/generate
POST   /api/planner/tasks
PUT    /api/planner/tasks/{id}
DELETE /api/planner/tasks/{id}
PATCH  /api/planner/tasks/{id}/complete
```

---

# 💻 Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | User Interface |
| TypeScript | Type Safety |
| Vite | Development and Build Tool |
| Tailwind CSS | Styling |
| React Router | Navigation |
| Axios / Fetch | API Communication |

---

## Backend

| Technology | Purpose |
|---|---|
| Python | Backend Language |
| FastAPI | REST API Framework |
| Uvicorn | ASGI Server |
| Pydantic | Data Validation |
| JWT | Authentication |
| bcrypt / passlib | Password Hashing |

---

## Database

| Technology | Purpose |
|---|---|
| MongoDB | Application Database |
| Motor | Async MongoDB Driver |

---

## External APIs

- YouTube Data API
- AI API

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/PALLAB2005/studyai-platform.git
```

Move into the project:

```bash
cd studyai-platform
```

---

# 🎨 Frontend Setup

Move to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:8000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 🐍 Backend Setup

Open another terminal and move to the backend:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

## Windows

```bash
venv\Scripts\activate
```

## Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create:

```text
backend/.env
```

Add:

```env
APP_NAME=StudyAI
ENVIRONMENT=development

MONGODB_URI=your_mongodb_connection_string
DATABASE_NAME=studyai

JWT_SECRET=your_secure_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

YOUTUBE_API_KEY=your_youtube_api_key

AI_API_KEY=your_ai_api_key

CLIENT_URL=http://localhost:5173
```

Never upload this file to GitHub.

---

# ▶️ Running the Application

## Start Backend

```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

Backend URL:

```text
http://localhost:8000
```

FastAPI API Documentation:

```text
http://localhost:8000/docs
```

---

## Start Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔒 Security

The following values must never be committed to GitHub:

```text
YOUTUBE_API_KEY
AI_API_KEY
JWT_SECRET
MONGODB_URI
```

Use environment variables.

Recommended `.gitignore`:

```gitignore
# Frontend
frontend/node_modules/
frontend/dist/
frontend/.env
frontend/.env.local

# Backend
backend/venv/
backend/.venv/
backend/.env

# Python
__pycache__/
*.pyc

# Environment
.env
.env.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

---

# 🚀 Deployment Architecture

Recommended deployment:

```text
React Frontend
       │
       ▼
Vercel / Netlify
       │
       │ REST API Requests
       ▼
FastAPI Backend
       │
       ▼
Render / Railway
       │
       ├──────── MongoDB Atlas
       │
       └──────── YouTube Data API
```

---

# 🔮 Future Improvements

Future versions of StudyAI may include:

- AI-generated video summaries
- Automatic notes generation
- Video transcript analysis
- AI flashcards
- Personalized recommendation system
- Learning analytics
- Study streaks
- Achievements and badges
- Mock AI interviews
- Resume analysis
- Job recommendations
- Notifications
- Study reminders
- Collaborative study groups
- Multilingual AI assistant
- Admin dashboard
- Student analytics dashboard

---

# 👨‍💻 Author

**Pallab Bag**

GitHub: [@PALLAB2005](https://github.com/PALLAB2005)

---

# 📄 License

This project is developed for educational, learning, and portfolio purposes.

---

⭐ If you find this project useful, consider giving the repository a star!
