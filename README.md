# Work in progress, not finished! Setup guide not applicable!

## Project Structure

```yaml
client/ # Frontend (React)
server/ # Backend (Express)
    db/ # Contains DB initialization
    dist/ # Where the built backend will be output
    src/
        config/ # Type definition and defaults for .env
        controllers/ # Route handlers
        db/ # DB pool
        middlewares/ # Middleware (error handling, rate limiter, user validation)
        openapi/ # Swagger router and OpenAPI schema definition
        repositories/ # Database access
        routes/ # Route definitions
        services/ # Logic used by controllers
        types/ # TS types
    .env.example # Backend config template
    package.json # Backend dependencies
    docker-compose.yml # PostgreSQL docker file
tests/ # Backend tests
types/ # Type extention for Express types
```


## Prerequisites

- Node.js (recommended: 24)
- Docker

## 1. Backend Setup

### 1.1 Copy environment file

```bash
cp server/.env.example server/.env
```

Then open `server/.env` and set your own values for `SHA256_SECRET`, `DB_USER` and `DB_PASSWORD`.

### 1.2 Start and initialize the database
Start the database:
```bash
cd server
docker compose up -d
```
Create the tables after starting it (replace `myuser` and `simplepolls` if you set a different user- or db-name in your `server/.env`):
```bash
docker exec -i simplepolls-postgresdb psql -U myuser -d simplepolls < db/init.sql
```
