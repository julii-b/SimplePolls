# Work in progress, not finished! Setup guide not applicable!

## Project Structure

```yaml
client/ # Frontend (React)
server/ # Backend (Express)
    .env.example # Backend config template
    docker-compose.yml # PostgreSQL docker file
```


## Prerequisites

- Node.js (recommended: >=18)
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
