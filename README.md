RecallNova Frontend

RecallNova is an AI-powered document learning platform that transforms PDFs into interactive learning experiences through AI chat, flashcards, and quizzes.

Built with a scalable frontend architecture using Next.js 16, React 19, TypeScript, and TailwindCSS.

Features
AI-powered document chat
PDF upload and document management
Flashcard generation
Dynamic quiz generation
Quiz progress persistence
Learning-focused UI/UX
Responsive desktop + mobile layout
Theme engine with multiple themes
Settings persistence using localStorage
Modular scalable component architecture
Backend API integration
Production-ready routing structure
Tech Stack
Frontend
Next.js 16
React 19
TypeScript
TailwindCSS v4
UI/UX
Responsive layout system
Dark/light custom themes
Component-based architecture
AI Integration
FastAPI backend integration
AI chat workflows
Quiz and flashcard generation
Project Structure
recallnova/
├── app/
├── components/
├── lib/
├── public/
├── styles/
├── next.config.ts
├── tailwind.config.ts
└── package.json
Screenshots
Home

Add screenshot here:

![Home](public/home-preview.png)
Chat
![Chat](public/chat-preview.png)
Quiz
![Quiz](public/quiz-preview.png)
Environment Variables

Create a .env.local file:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

Production:

NEXT_PUBLIC_API_URL=https://your-render-backend.onrender.com
Installation
git clone <repo-url>

cd recallnova

npm install
Run Development Server
npm run dev

Frontend runs on:

http://localhost:3000
Production Build
npm run build
npm start
Backend Dependency

This frontend requires the RecallNova FastAPI backend.

Backend handles:

AI chat
PDF processing
Quiz generation
Flashcards
Storage
Retrieval workflows
Current Architecture
Core Modules
Chat System
Learning System
Quiz Engine
Flashcard Engine
Upload Manager
Theme System
Settings Persistence
Future Roadmap
Authentication system
Real-time streaming responses
Multi-document chat
AI memory system
Team workspaces
SaaS subscription plans
AI study analytics
OCR support
Vector database retrieval
Advanced semantic search
AI-generated study plans
Deployment
Frontend

Recommended:

Vercel
Backend

Recommended:

Render
Author

Built as a scalable AI learning platform focused on modern educational workflows and production-ready architecture.

License

MIT License