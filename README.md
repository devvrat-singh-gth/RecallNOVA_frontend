# RecallNova Frontend

RecallNova is an AI-powered document learning workspace that turns uploaded study material into an interactive learning environment.

The frontend provides the user-facing experience for document upload, AI-powered PDF chat, flashcards, quizzes, dashboards, settings, authentication, guest workspaces, and responsive workspace navigation.

Built with Next.js, React, TypeScript, and Tailwind CSS, with a modular architecture designed to integrate with the RecallNova FastAPI backend.

---

## Overview

RecallNova is built around a simple learning workflow:

```text
Upload documents
      ↓
Retrieve relevant content
      ↓
Chat with documents
      ↓
Generate flashcards
      ↓
Generate quizzes
      ↓
Track learning progress
```

The frontend communicates with the RecallNova backend through a centralized authentication-aware REST API client.

---

## Features

### Authentication

* Google authentication
* Email/password authentication
* Persistent authenticated sessions
* JWT access-token authentication
* HttpOnly refresh-session support
* Automatic access-token refresh
* Centralized authentication state
* Profile drawer
* Account and settings navigation
* Protected application experience

### Guest Workspace

* Continue as Guest
* Persistent guest identity per browser
* Guest-specific workspace routes
* Guest document uploads
* Guest AI chat
* Guest chat sessions
* Guest flashcards
* Guest learning hub
* Guest-specific limits
* Guest quiz access restriction
* Guest-aware navigation
* Guest workspace restoration while retained by the backend

Guest identity is maintained through:

```text
localStorage
└── recallnova_guest_id
```

The guest access token is stored separately through:

```text
recallnova_access_token
```

Guest data retention is ultimately controlled by the backend.

### Document Workspace

* PDF upload
* Document listing
* Document deletion
* Document preview information
* Document size display
* Multi-document selection
* Delete confirmation
* Upload loading state
* Workspace loading state
* Empty workspace state
* Responsive document management interface

### AI PDF Chat

* Document-grounded AI conversations
* Persistent chat sessions
* Chat history
* Session titles
* Document selection
* Page-range based retrieval
* Focused document querying
* Response caching
* Rate-limit aware requests
* Token guarding
* Responsive chat interface

### Learning

* AI-generated flashcards
* AI-generated quizzes
* Configurable card/question counts
* Difficulty selection
* Topic support
* Flashcard pagination
* Known/starred card state
* Quiz session flow
* Quiz progress persistence
* Quiz resume support
* Guest learning restrictions

### Dashboard

* Learning statistics
* Usage information
* Workspace overview
* Account information

### User Experience

* Responsive desktop/mobile layouts
* Guest and authenticated navigation
* Mobile navigation drawer
* Profile drawer
* Multiple themes
* Persistent learning preferences
* Custom scrollbar support
* Responsive settings interface
* Responsive modals
* Responsive loading states
* Dynamic empty states
* Dynamic guest/auth upload navigation

---

## Theme System

RecallNova uses a centralized `ThemeProvider`.

Supported themes:

```text
light
dark
mint
neon
```

Theme state is persisted locally and applied through CSS variables such as:

```text
--bg
--text
--card
--border
--primary
```

Components that depend on application colors should use the theme variables instead of hard-coded theme colors where practical.

---

## Tech Stack

### Core

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS v4

### UI

* Lucide React
* Component-based UI architecture
* Responsive utility-based styling
* Custom theme system

### Authentication

* Google Identity Services
* RecallNova email authentication
* JWT access tokens
* HttpOnly refresh-session cookies
* Client-side authentication provider

### API

* Fetch API
* Centralized API client
* Automatic token refresh
* Authenticated request handling
* Multipart/form-data support
* FastAPI REST backend integration

### Deployment

* Vercel

---

## Architecture

```text
recallnova/

├── app/
│   ├── (app)/
│   ├── guest/
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
│   ├── GuestSidebar.tsx
│   ├── ProfileDrawer.tsx
│   └── UploadBox.tsx
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
└── tsconfig.json
```

---

## Route Structure

Authenticated workspace routes use the normal application namespace:

```text
/chat
/upload
/learning
/learning/flashcards
/learning/quiz
/dashboard
```

Guest routes use a separate namespace:

```text
/guest
/guest/chat
/guest/chat/[chatId]
/guest/upload
/guest/learning
/guest/learning/flashcards
/guest/learning/quiz
```

This separation prevents guest and registered workspace URLs from being mixed.

---

## Authentication Flow

Registered users authenticate using Google or email/password.

```text
Login / Signup
      ↓
RecallNova Backend
      ↓
Access Token
+
Refresh Session
      ↓
AuthProvider
      ↓
Application
```

Guest authentication follows a separate flow:

```text
Continue as Guest
      ↓
Existing guest ID or new guest ID
      ↓
Guest JWT
      ↓
AuthProvider
      ↓
/guest workspace
```

The guest identity can be reused by the same browser while the guest data remains available on the backend.

---

## API Client

`lib/apiClient.ts` provides the centralized request layer.

Responsibilities include:

* Attaching the access token
* Sending credentials
* Handling JSON requests
* Supporting multipart/form-data uploads
* Refreshing expired access tokens
* Preventing simultaneous refresh requests
* Retrying failed authenticated requests
* Removing invalid access tokens
* Centralizing request behavior

Application-specific API functions are exposed through:

```text
lib/api.ts
```

---

## Learning Preferences

Learning preferences are stored locally in the browser.

Current settings include:

```text
quiz_timer
quiz_count
flashcard_count
```

Default values:

```text
Quiz timer:       30
Quiz count:        5
Flashcard count:  10
```

The preferences are read and validated before being used by learning requests.

---

## Guest Limits

Guest limits are enforced by the backend plan configuration.

Current guest limits are:

```text
Messages
  Daily:       10
  Monthly:     100

Flashcard generations
  Daily:       2
  Monthly:     10

Quiz generations
  Daily:       2
  Monthly:     10

Documents
  Maximum:     2

Chat sessions
  Maximum:     5

Rate limit
  5 requests/minute
```

The frontend displays user-facing states and warnings, but backend enforcement remains authoritative.

---

## Loading & Empty States

The frontend provides explicit loading states for asynchronous workspace operations.

Examples:

```text
Loading workspace...
Loading flashcards...
Loading quizzes...
Uploading document...
```

Empty document workspaces display:

```text
UPLOAD DOCUMENTS IN THE UPLOAD PAGE TO START!
```

Learning pages can provide a dynamic upload action:

```text
Registered → /upload
Guest      → /guest/upload
```

These states prevent empty or partially initialized interfaces from appearing broken.

---

## Backend Dependency

RecallNova Frontend requires the RecallNova FastAPI backend.

The backend is responsible for:

* Authentication
* Guest identity handling
* Session management
* PDF processing
* Document persistence
* Retrieval
* AI chat
* Flashcard generation
* Quiz generation
* Quiz persistence
* Quiz progress
* Usage limits
* Rate limiting
* Guest data retention
* MongoDB persistence

---

## Environment Variables

Local development:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Production:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

Do not commit:

```text
.env
.env.local
.env.production
```

---

## Installation

```bash
git clone <repository-url>

cd recallnova

npm install
```

---

## Development

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

## Production Build

```bash
npm run build
npm start
```

---

## Deployment

### Frontend

Recommended deployment:

**Vercel**

Typical configuration:

```text
Framework: Next.js
Install Command: npm install
Build Command: npm run build
```

Set the required production environment variables in Vercel.

### Backend

The frontend expects the backend URL through:

```env
NEXT_PUBLIC_API_URL
```

---

## Current Status

Implemented:

* Registered authentication
* Google login
* Email authentication
* Persistent auth sessions
* Guest mode
* Persistent guest identity
* Guest-specific routes
* Guest navigation
* Guest document workspace
* Guest chat
* Guest flashcards
* Guest learning hub
* Guest quiz restriction
* Usage-aware frontend
* ThemeProvider
* Multiple themes
* Responsive UI
* Loading and empty states
* Dashboard
* Settings
* Profile drawer
* Document management
* Chat history
* Flashcard persistence
* Quiz persistence
* Quiz progress

Doc Atlas has its product/UI direction established but advanced interactive relationship mapping remains a future feature.

---

## Roadmap

* Streaming AI responses
* Advanced semantic/vector search
* Multi-document reasoning
* AI memory/context improvements
* OCR support
* Background processing
* Advanced learning analytics
* Personalized study plans
* Guest-to-account migration
* Subscription and billing workflows
* Team workspaces
* Advanced Doc Atlas functionality

---

## License

MIT License
