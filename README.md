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

- Docker and Docker Compose
- Git

Node.js, PostgreSQL, Prisma, and other project dependencies are not required to run the application because they are handled inside Docker containers.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sandevnee/todo-task-manager.git
cd todo-task-manager
```

### 2. Start the application

```bash
docker compose up --build
```

This will:
- Pull and start a PostgreSQL 15 database
- Create the `tododb` database inside Docker
- Run database migrations automatically
- Start the Express backend API on port 3000
- Start the React frontend on port 5173

### 3. Open the application

Once all containers are running, open your browser and go to:
http://localhost:5173

### Stopping the application

```bash
docker compose down
```

Or, for older Docker Compose versions:

```bash
docker-compose down
```

## Running Tests

The application can be built and run using Docker only.

The following test commands are for running tests locally and require Node.js/npm to be installed on the local machine.

### Backend Tests (Unit + Integration)

```bash
cd backend
npm install
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
npm install
npm run test:run
```

### End-to-End Tests (Playwright)

Make sure the application is running via Docker first:

```bash
docker compose up --build
```
Then run:

```bash
npm install
npx playwright install
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
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── services/            # API service layer
│   │   └── tests/               # Component tests
│   ├── Dockerfile
│   └── package.json
├── tests/                       # Playwright E2E tests
├── docker-compose.yml
├── playwright.config.js
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
- Unit, integration, frontend component, and E2E tests included