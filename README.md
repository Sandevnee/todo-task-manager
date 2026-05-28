# Todo Task Manager

A full-stack to-do task web application built with React, Express, PostgreSQL, and Prisma. 

The application allows users to create tasks, view the 5 most recent active tasks, and mark tasks as complete.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, SweetAlert2, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Containerization:** Docker, Docker Compose
- **Testing:** Jest, Supertest (backend), Vitest, React Testing Library (frontend), Playwright (E2E)

## Requirements

- Docker Desktop
- Git

Installation of Node.js, PostgreSQL, or any other tools are not needed.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sandevnee/todo-task-manager.git
cd todo-task-manager
```

### 2. Start the application

```bash
docker-compose up --build
```

This will:
- Pull and start a PostgreSQL 15 database
- Run database migrations automatically
- Start the Express backend API on port 3000
- Start the React frontend on port 5173

### 3. Open the application

Once all containers are running, open your browser and go to:
http://localhost:5173

### Stopping the application

```bash
docker-compose down
```

## Running Tests

### Backend Tests (Unit + Integration)

```bash
cd backend
npm test
```

To see test coverage:

```bash
cd backend
npm run test:coverage
```

### Frontend Tests (Component)

```bash
cd frontend
npm run test:run
```

### End-to-End Tests (Playwright)

Make sure the application is running via Docker first, then:

```bash
npx playwright test
```

## Project Structure
todo-task-manager/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── migrations/          # Database migrations
│   ├── src/
│   │   ├── controllers/         # HTTP request handlers
│   │   ├── middleware/          # Error handling middleware
│   │   ├── routes/              # API route definitions
│   │   ├── services/            # Business logic
│   │   ├── tests/               # Unit and integration tests
│   │   ├── app.js               # Express app setup
│   │   ├── server.js            # Server entry point
│   │   └── prismaClient.js      # Prisma client instance
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── services/            # API service layer
│   │   └── tests/               # Component tests
│   └── Dockerfile
├── tests/                       # Playwright E2E tests
├── docker-compose.yml
└── README.md

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get 5 most recent incomplete tasks |
| POST | /api/tasks | Create a new task |
| PATCH | /api/tasks/:id/done | Mark a task as complete |

## Features

- Create tasks with a title and description
- View the 5 most recent active tasks
- Mark tasks as complete — completed tasks are removed from the list
- Form validation with per-field error messages
- Success and error notifications via SweetAlert2
- Responsive design for mobile and desktop
- Full test coverage across unit, integration and E2E tests