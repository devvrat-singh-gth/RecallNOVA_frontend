# RecallNova Frontend

RecallNova is an AI-powered document learning workspace that turns uploaded study material into an interactive learning environment.

The frontend provides the user-facing experience for document upload, AI-powered PDF chat, flashcards, quizzes, dashboards, settings, authentication, and responsive workspace navigation.

Built with Next.js, React, TypeScript, and Tailwind CSS, with a modular architecture designed to integrate with the RecallNova FastAPI backend.

---

## Overview

RecallNova is built around a simple learning workflow:

```text
Upload documents
      ↓
Retrieve relevant content
      ↓
Chat with your documents
      ↓
Generate flashcards
      ↓
Generate quizzes
      ↓
Track learning progress
```

The frontend communicates with the RecallNova backend through authenticated REST APIs.

---

## Features

### Authentication

* Google authentication
* Email/password authentication
* Persistent authenticated sessions
* Access-token based API authentication
* Refresh-session support
* Protected application experience
* Profile drawer and authenticated user navigation

### Document Workspace

* PDF upload
* Document listing
* Document deletion
* Document preview information
* Responsive document management interface

### AI PDF Chat

* Document-grounded AI conversations
* Persistent chat sessions
* Chat history
* Session titles
* Document selection
* Page-range based retrieval
* Focused document querying

### Learning

* AI-generated flashcards
* AI-generated quizzes
* Configurable question/card counts
* Difficulty selection
* Topic-based learning
* Quiz progress persistence

### Dashboard

* Learning statistics
* Usage information
* Workspace overview
* Account-related information

### User Experience

* Responsive desktop and mobile layouts
* Authenticated desktop header/navigation
* Mobile navigation drawer
* Profile drawer
* Multiple application themes
* Persistent learning preferences
* Custom scrollbar support
* Responsive settings interface
* Adaptive card and content layouts

---

## Tech Stack

### Core

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS v4

### UI

* Lucide React
* Responsive CSS utility architecture
* Custom theme system
* Component-based UI architecture

### Authentication

* Google Identity Services
* Custom RecallNova email authentication
* JWT access tokens
* HttpOnly refresh-session cookies

### API

* Fetch-based API client
* Centralized authentication-aware request handling
* Automatic access-token refresh
* FastAPI REST backend integration

### Deployment

* Vercel

---

## Architecture

The frontend is separated into application routes, reusable UI components, API utilities, authentication state, and styling.

```text
recallnova/
│
├── app/
│   ├── (app)/
│   ├── login/
│   ├── signup/
│   ├── settings/
│   ├── page.tsx
│   └── layout.tsx
│
├── components/
│   ├── auth/
│   ├── home/
│   ├── ui/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── ProfileDrawer.tsx
│
├── lib/
│   ├── api.ts
│   └── apiClient.ts
│
├── public/
│
├── styles/
│   └── globals.css
│
├── next.config.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## Authentication Flow

The frontend supports two authentication methods:

```text
                 RecallNova
                     │
          ┌──────────┴──────────┐
          │                     │
       Google                Email/Password
          │                     │
          └──────────┬──────────┘
                     ↓
             RecallNova Backend
                     ↓
              Access Token
                     +
          Refresh Session Cookie
```

The access token is used for authenticated API requests.

The refresh credential is stored in an HttpOnly cookie and is not exposed to client-side JavaScript.

---

## API Client

`lib/apiClient.ts` provides a centralized request layer.

Responsibilities include:

* Attaching the access token
* Sending authenticated cookies
* Handling JSON requests
* Supporting multipart/form-data uploads
* Refreshing expired access tokens
* Preventing multiple simultaneous refresh requests
* Repeating the failed request after successful refresh

Application-specific API functions are exposed through:

```text
lib/api.ts
```

---

## Environment Variables

Create a local environment file:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

For production:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Do not commit `.env`, `.env.local`, or other environment files containing secrets.

---

## Installation

```bash
git clone <repository-url>
cd recallnova
npm install
```

---

## Development

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

## Backend Dependency

RecallNova Frontend requires the RecallNova FastAPI backend.

The backend is responsible for:

* Authentication
* Session management
* PDF processing
* Document storage
* Retrieval
* AI chat
* Flashcard generation
* Quiz generation
* Quiz persistence
* Usage limits
* MongoDB persistence

---

## Screenshots

Add project screenshots under `public/` and reference them here.

### Home

```md
![RecallNova Home](public/home-preview.png)
```

### Chat

```md
![RecallNova Chat](public/chat-preview.png)
```

### Quiz

```md
![RecallNova Quiz](public/quiz-preview.png)
```

---

## Deployment

### Frontend

Recommended deployment:

**Vercel**

Typical configuration:

```text
Framework: Next.js
Build Command: npm run build
Install Command: npm install
```

Set the required production environment variables in Vercel.

### Backend

The frontend expects the backend URL through:

```env
NEXT_PUBLIC_API_URL
```

---

## Development Principles

The frontend follows several architectural principles:

* Keep authentication centralized
* Keep API communication centralized
* Keep reusable UI components modular
* Keep application routes separated by responsibility
* Keep responsive behavior across desktop, tablet, and mobile
* Avoid exposing server-side secrets to the browser

---

## Roadmap

Planned improvements include:

* Streaming AI responses
* Multi-document conversations
* Advanced semantic search
* AI memory/context improvements
* Expanded learning analytics
* OCR support
* Team workspaces
* Subscription and billing workflows
* Personalized AI study plans
* More advanced Doc Atlas functionality

---

## License

MIT License
