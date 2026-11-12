# Kind Food App

A modern food ordering and delivery web app built with React on the frontend and a TypeScript, Express, PostgreSQL, and Prisma backend.

## Tech stack

- Frontend: React, React Router, Bootstrap, CSS
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL with Prisma ORM
- Configuration: dotenv and environment-based settings

## Backend structure

The backend lives in `server/` and follows a modular monolith layout:

```text
server/
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── config/
│   ├── modules/health/
│   ├── modules/users/
│   ├── app.ts
│   └── server.ts
├── .env.example
├── package.json
└── tsconfig.json
```

The old JavaScript/Mongoose files remain in the repository for reference, but the active backend scripts now use the TypeScript/Prisma application. Authentication and broader business APIs are intentionally not mounted yet; users CRUD is included as a reference module.

## Prerequisites

- Node.js 20 or newer
- npm
- PostgreSQL 14 or newer

## Installation

Install the frontend and backend dependencies, then apply the database migration and seed the default roles:

```bash
npm install
cd server
npm install
copy .env.example .env # Windows; use cp on macOS/Linux
npm run db:setup
```

Set `DATABASE_URL` in `server/.env`, for example:

```env
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/king_food_app?schema=public
```

## Running

Start the backend from `server/`:

```bash
npm run dev
```

Start the frontend from the repository root:

```bash
npm start
```

The API health check is available at `http://localhost:5000/api/v1/health`.

## Users CRUD reference

The reference module is available under `/api/v1/users`:

```text
POST   /api/v1/users
GET    /api/v1/users?page=1&limit=20&search=anirudh
GET    /api/v1/users/:id
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id
```

The module is organized like a Spring Boot feature: routes are similar to a controller mapping, controllers handle HTTP concerns, the service contains application/database operations, and Prisma Client is the repository-like database access layer.

## Database commands

```bash
npm run prisma:validate
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```
