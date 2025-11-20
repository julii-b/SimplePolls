# SimplePolls

SimplePolls is a full‑stack polling application built with React and Express. Users can use the app to ask each other productive or fun questions and vote in real-time.

It has the following features:
- Users can create new polls and edit existing polls in their ownership
- Users can share their polls to other users
- Users can participate in polls created by other users
- The app is available in three languages
- The app's responsive design allows it to be used on mobile and desktop
- The backend offers a public API

You can have a look and play around with the frontend here: [simplepolls.julius-busch.com](https://simplepolls.julius-busch.com)

And view the API documentation here: [apisimplepolls.julius-busch.com/docs](https://apisimplepolls.julius-busch.com/docs)

## 🛠️ Tech Stack

- Frontend:
    - Language: TypeScript
    - Framework: React
    - Routing: React Router API
- Backend:
    - Language: TypeScript
    - Framework: Express
    - ORM: Prisma with PostgreSQL
    - Documentation: OpenAPI
    - Tests: Supertest & Vitest

## 🧩 Project Structure

```yaml
client/ # Frontend (React)
    dist/ # Where the built frontend will be output
    public/ # Contains static files
        locales/ # Translation files
    src/
        components/ # Contains reusable components
        config/ # Type definition and defaults for .env
        customHooks/ # Custom hooks
        pages/ # Contains components, loader, action, and child components for routes
        services/ # Services that communicate with the backend
        types/ # TS types
        main.tsx # Application entry point
    package.json
    .env
server/ # Backend (Express)
    dist/ # Where the built backend will be output
    prisma/ # Contains the Prisma database schema and migrations
    scripts/ # Contains scripts for the setup
    src/ 
        config/ # Type definition and defaults for .env
        controllers/ # Route handlers
        db/ # Prisma client
        middlewares/ # Middleware (error handling, rate limiter, user validation)
        openapi/ # Swagger router and OpenAPI schema definition
        repositories/ # Database access
        routes/ # Route definitions
        services/ # Logic used by controllers
        types/ # TS types
        server.ts # Server bootstrapper
    tests/ # Backend tests
    types/ # Type extension for Express types
    docker-compose.yml # PostgreSQL docker file
    package.json
    .env
```


## 📦 Installation

### Prerequisites

- Node.js (recommended: 24)
- Docker

Clone the repository:
```
git clone https://github.com/julii-b/simplepolls.git
cd SimplePolls
```

### 1. Backend Setup

#### 1.1 Copy environment file

```bash
cd server
cp .env.example .env
```
On Windows:
```
cd server
copy .env.example .env
```

Then open `server/.env` and set your own values for `DB_USER` and `DB_PASSWORD`.

#### 1.2 Start the database

```
docker compose up -d
```

Wait until Postgres is ready.

#### 1.3 Install dependencies, run database migrations, and start server

```
npm install
npm run setup-prisma
npm run dev
```

If you want, you can now have a look at the API routes documentation at [localhost:3000/docs](http://localhost:3000/docs) or at [apisimplepolls.julius-busch.com/docs](https://apisimplepolls.julius-busch.com/docs)

### 2. Frontend Setup

#### 2.1 Copy environment file

Open another terminal window.

On Linux:
```bash
cd client
cp .env.example .env
```
On Windows:
```
cd client
copy .env.example .env
```

#### 2.2 Install dependencies and start the client

```bash
npm install
npm run dev
```
