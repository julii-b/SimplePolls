# Work in progress, not finished! Setup guide not applicable!

## Project Structure

```yaml
client/ # Frontend (React)
server/ # Backend (Express)
    db/ # Contains DB initialization
    dist/ # Where the built backend will be stored
    src/
        controllers/
        middlewares/
        openapi/
        repositories/
        routes/
        services/
        types/
    .env.example # Backend config template
    package.json # Backend package.json
    docker-compose.yml # PostgreSQL docker file
```


## Prerequisites

- Node.js (recommended: 24)
- Docker

## 1. Backend Setup

### 1.1 Copy environment file

```bash
cp server/.env.example server/.env
```

Then open `server/.env` and set your own values for `DB_USER` and `DB_PASSWORD`.

### 1.2 Start and initialize the database
Start the database:
```bash
cd server
docker compose up -d
```
Create the tables after starting it (replace `myuser` and `simplepolls` if you set a different user- or app-name in your `server/.env`):
```bash
docker exec -i postgres-db psql -U myuser -d simplepolls < db/init.sql
```
