Directory structure:
└── smart-star-nodejs_auth/
    ├── docker-compose.yml
    ├── package.json
    ├── tsconfig.json
    ├── Guides/
    │   ├── folder-structure-guide.md
    │   ├── nextjs-frontend-integration.md
    │   ├── sql-queries-guide.md
    │   ├── node-pg-migrate/
    │   │   └── README.md
    │   └── zod/
    │       └── README.md
    ├── migrations/
    │   ├── 001_enable_pgcrypto.sql
    │   ├── 002_create_users_table.sql
    │   ├── 003_create_support_tasks_table.sql
    │   └── 004_create_banners_table.sql
    └── src/
        ├── app.ts
        ├── server.ts
        ├── config/
        │   └── env.ts
        ├── lib/
        │   ├── cloudinary.ts
        │   ├── db.ts
        │   ├── google.ts
        │   ├── jwt.ts
        │   ├── logger.ts
        │   ├── redis.ts
        │   └── caching/
        │       ├── banner.cache.ts
        │       └── user.task.cache.ts
        ├── middleware/
        │   ├── admin.middleware.ts
        │   ├── auth.middleware.ts
        │   ├── banner.middleware.ts
        │   ├── error-handler.ts
        │   └── not-found.ts
        ├── queues/
        │   └── delete-cloudinary-image.queue.ts
        ├── repositories/
        │   ├── admin.banner.repository.ts
        │   ├── admin.task.repository.ts
        │   ├── admin.users.repository.ts
        │   ├── user.repository.ts
        │   └── user.task.repository.ts
        ├── routes/
        │   ├── admin.banner.routes.ts
        │   ├── admin.task.routes.ts
        │   ├── admin.users.routes.ts
        │   ├── auth.routes.ts
        │   ├── health.routes.ts
        │   ├── index.ts
        │   └── user.task.routes.ts
        ├── services/
        │   ├── admin.banner.service.ts
        │   ├── admin.task.service.ts
        │   ├── admin.users.service.ts
        │   ├── auth.service.ts
        │   └── user.task.service.ts
        ├── types/
        │   ├── banner.types.ts
        │   ├── express.d.ts
        │   ├── google.types.ts
        │   ├── task.types.ts
        │   └── user.types.ts
        ├── utils/
        │   └── constants.ts
        ├── validation/
        │   ├── auth.schema.ts
        │   ├── banner.schema.ts
        │   └── task.schema.ts
        └── workers/
            └── delete-cloudinary-image.worker.ts

================================================
FILE: docker-compose.yml
================================================
services:
  postgres:
    image: postgres:16-alpine
    container_name: nodejs-capstone-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: nodejs-capstone
    ports:
      - "5441:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
  redis:
    image: redis:7-alpine
    container_name: nodejs-capstone-redis
    restart: unless-stopped
    ports:
      - "6385:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:



================================================
FILE: package.json
================================================
{
  "name": "node/express auth and file_upload",
  "version": "1.0.0",
  "description": "",
  "main": "dist/server.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsx --watch src/server.ts",
    "start": "node dist/server.js",
    "docker-up": "docker compose up -d",
    "docker-down": "docker compose down",
    "migrate": "npx node-pg-migrate up",
    "migrate:down": "npx node-pg-migrate down",
    "migrate:create": "npx node-pg-migrate create",
    "migrate:redo": "npx node-pg-migrate redo",
    "psql": "psql -h localhost -p 5441 -U postgres -d nodejs-capstone",
    "worker": "tsx src/workers/delete-cloudinary-image.worker.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/cors": "^2.8.19",
    "@types/express": "^5.0.6",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/multer": "^2.2.0",
    "@types/node": "^26.1.1",
    "@types/pg": "^8.20.3",
    "node-pg-migrate": "^9.0.0",
    "pino-pretty": "^13.1.3",
    "tsx": "^4.23.0",
    "typescript": "^6.0.3"
  },
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "bullmq": "^6.3.4",
    "cloudinary": "^2.11.0",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "google-auth-library": "^11.2.0",
    "ioredis": "^6.0.0",
    "jsonwebtoken": "^9.0.3",
    "multer": "^2.3.0",
    "pg": "^8.22.0",
    "pino": "^10.3.1",
    "zod": "^4.4.3"
  }
}



================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "ignoreDeprecations": "6.0"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}



================================================
FILE: Guides/folder-structure-guide.md
================================================
# Project Architecture & Folder Guide

This document explains the purpose of each directory in this backend application. This setup utilizes a **Layered Architecture (Repository-Service Pattern)**, which separates concerns to ensure the codebase remains maintainable, testable, and scalable as the project grows.

---

## 📁 Project Structure Overview

```text
capstone-project/
├── migrations/                # Database schema version control
├── src/                       # Application source code
│   ├── config/                # Environment and global configurations
│   ├── errors/                # Custom error classes
│   ├── lib/                   # Core third-party initializations (DB, Logger)
│   ├── middleware/            # Express global middlewares
│   ├── repositories/          # Data Access Layer (Direct DB interactions)
│   ├── routes/                # Transport Layer (HTTP request routing)
│   ├── services/              # Business Logic Layer (The application "brain")
│   ├── types/                 # Global TypeScript definitions
│   └── utils/                 # Shared helper functions
├── .env                       # Local environment variables
└── docker-compose.yml         # Containerized infrastructure config
```

---

## 🛠️ Detailed Folder Breakdown

### 1. `migrations/`

- **Purpose**: Tracks structural changes to your database over time (DDL history).
- **Why it exists**: Instead of manually editing tables, migrations ensure every developer and your production server run the exact same database schema.
- **Example**: `001_enable_pgcrypto.sql` installs necessary cryptographic extensions into PostgreSQL before tables are created.

### 2. `src/config/`

- **Purpose**: Manages app-wide configurations and safely parses environmental variables. config describes environment and settings
- **Why it exists**: Prevents `process.env` from scattering across the app. `env.ts` typically uses validation libraries (like Zod) to crash the app immediately on startup if a required variable is missing.

### 3. `src/errors/`

- **Purpose**: Houses custom error classes.
- **Why it exists**: Standardizes how errors look. Your `app-error.ts` defines operational errors (like a `400 Bad Request` or `409 Conflict`) so the frontend receives consistent, predictable error responses.

### 4. `src/lib/`

- **Purpose**: Houses long-lived clients and utility instances.
- **Why it exists**: lib implements reusable logic. Ensures libraries like your database driver (`db.ts`) or logger (`logger.ts`) are initialized exactly once and reused across the application safely.

### 5. `src/middleware/`

- **Purpose**: Functions that intercept incoming requests before they hit your routes, or process responses right before they go to the client.
- **Why it exists**: Promotes code reuse. `error-handler.ts` catches any rejected promises/errors globally so the server never crashes, while `not-found.ts` handles invalid URLs.

### 6. `src/routes/`

- **Purpose**: The "Receptionist" layer. Maps HTTP endpoints to specific controller functions.
- **Why it exists**: This layer only handles HTTP concerns (extracting parameters, status codes, headers). It should never touch raw database logic or run complex business equations.

### 7. `src/services/`

- **Purpose**: The "Brain" or Business Logic Layer.
- **Why it exists**: This is where core rules live. For example, your `auth.service.ts` dictates what happens when a user registers: it normalizes input, checks if a password is too short, hashes passwords with bcrypt, and coordinates data flow.

### 8. `src/repositories/`

- **Purpose**: The Data Access Layer.
- **Why it exists**: Isolates SQL queries and ORM calls. `user.repository.ts` handles the raw data fetching and inserting (`SELECT * FROM users...`). If you ever swap your database (e.g., PostgreSQL to MongoDB), you _only_ rewrite files in this folder; your routes and services stay completely untouched.

---

## 🔄 How a Request Flows Through This System

When a user submits a registration request, it flows linearly through your folders:

```text
[ Client Request ]
       │
       ▼
 1. src/routes/auth.routes.ts         --> Validates HTTP payload, forwards to service
       │
       ▼
 2. src/services/auth.service.ts       --> Checks business rules, hashes password
       │
       ▼
 3. src/repositories/user.repository.ts --> Runs SQL query to insert user into DB
       │
       ▼
 [ Database Table ]
```

---

## 💡 Alternative approach: Feature-Based (Vertical Slice)

If technical layering feels too deep for a smaller project, structures can be refactored by **feature** rather than technical type. This keeps all files belonging to a specific capability in the same room:

```text
src/
└── features/
    ├── auth/
    │   ├── auth.routes.ts
    │   ├── auth.service.ts
    │   ├── user.repository.ts
    │   └── user.types.ts
    └── support/
        ├── support.routes.ts
        ├── support.service.ts
        └── support.repository.ts
```



================================================
FILE: Guides/nextjs-frontend-integration.md
================================================
# Connect a Next.js + shadcn UI to this API

This guide covers the existing Express API in this repository and a separate
Next.js app. The API is the source of truth for authentication and data; the
browser should call the API, not connect directly to PostgreSQL or Redis.

## 1. Understand the local setup

The current [docker-compose.yml](../docker-compose.yml) starts PostgreSQL and
Redis only. It publishes PostgreSQL on host port `5441` and Redis on host port
`6385`. The Express API uses port `3003` when `PORT=3003` is set, and the Next.js
development server normally uses port `3000`.

For the simplest development setup:

1. Start PostgreSQL and Redis from this API project's root:

   ```powershell
   npm run docker-up
   ```

2. Configure the API's root `.env` as described below, then start the API:

   ```powershell
   npm run dev
   ```

3. In a separate terminal, start the Next.js app:

   ```powershell
   npm run dev
   ```

Check that the API is reachable at `http://localhost:3003/api/health`. The
actual URL depends on the API's `PORT`.

## 2. Keep configuration in environment files

Use the API project's root `.env` for backend settings. Do not commit it or put
its secrets in the Next.js app. The API validates its settings in
[src/config/env.ts](../src/config/env.ts); several integrations are required
even if you are not using their UI features yet.

Ensure the API project's `.gitignore` excludes `.env`. Next.js normally
excludes `.env.local`; check that it does too. Commit a placeholder
`.env.example` if you want to document required names, but never copy real
credentials into that example.

The following is a template, not a replacement for your existing `.env`.
Use values that match your local Docker setup:

```env
PORT=3003
NODE_ENV=development
LOG_LEVEL=debug

POSTGRES_USER=postgres
POSTGRES_PASSWORD=replace-with-a-local-password
POSTGRES_DB=nodejs-capstone
POSTGRES_PORT=5441
REDIS_PORT=6385

# The API runs on your computer, outside Docker, so use localhost and
# the published host ports.
DATABASE_URL=postgres://postgres:replace-with-a-local-password@localhost:5441/nodejs-capstone
REDIS_URL=redis://localhost:6385

JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=30m

CLOUDINARY_CLOUD_NAME=replace-me
CLOUDINARY_API_KEY=replace-me
CLOUDINARY_SECRET=replace-me

GOOGLE_CLIENT_ID=replace-me
GOOGLE_CLIENT_SECRET=replace-me
GOOGLE_CALLBACK_URL=http://localhost:3003/api/auth/google/callback
```

The Compose file does not currently read the `POSTGRES_*` and `*_PORT` values
above; its credentials and port mappings are written directly in the file.
To make those Compose settings configurable, change the `postgres` service to
use:

```yaml
environment:
  POSTGRES_USER: ${POSTGRES_USER:-postgres}
  POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Set POSTGRES_PASSWORD in .env}
  POSTGRES_DB: ${POSTGRES_DB:-nodejs-capstone}
ports:
  - "${POSTGRES_PORT:-5441}:5432"
```

And change the `redis` service port mapping to:

```yaml
ports:
  - "${REDIS_PORT:-6385}:6379"
```

Compose reads the root `.env` for `${...}` substitutions. The API separately
loads that file through dotenv. Keep `DATABASE_URL`'s username, password,
database name, and host port in sync with the PostgreSQL Compose settings.
Likewise, `REDIS_URL`'s port must match the Redis host port.

In the Next.js project, create `.env.local`:

```env
# Browser-accessible API base URL; include /api exactly once.
NEXT_PUBLIC_API_URL=http://localhost:3003/api
```

Restart Next.js after changing environment variables. `NEXT_PUBLIC_` values
are bundled for use in the browser, so this variable must contain only a
public API URL. Never put database URLs, Redis URLs, JWT secrets, Cloudinary
secrets, or Google client secrets in the Next.js environment.

If Compose later runs the API in a container, its database and Redis URLs
must use Compose service DNS names and container ports, not `localhost` or
published host ports:

```env
DATABASE_URL=postgres://postgres:replace-with-a-local-password@postgres:5432/nodejs-capstone
REDIS_URL=redis://redis:6379
```

Inside an API container, `localhost` refers to that API container itself.
The browser still needs a URL it can reach, such as
`http://localhost:3003/api`; it cannot resolve Docker-only names such as
`api` or `postgres`.

## 3. API routes the UI can call

All routes are prefixed with `/api`. Successful responses use JSON and
generally include `success`, with returned values under `data`.

| Feature | Method and path | Authentication | Request |
| --- | --- | --- | --- |
| Health check | `GET /api/health` | No | — |
| Register | `POST /api/auth/register` | No | `{ "email": "...", "password": "..." }` |
| Log in | `POST /api/auth/login` | No | `{ "email": "...", "password": "..." }` |
| Google login | `GET /api/auth/google` | No | Browser navigation/redirect |
| Current user | `GET /api/auth/me` | Admin token | Bearer token |
| List tasks | `GET /api/tasks` | User token | Bearer token |
| Create task | `POST /api/tasks` | User token | `{ "title": "..." }` |
| Get task | `GET /api/tasks/:taskId` | User token | Bearer token |
| Rename task | `PATCH /api/tasks/:taskId` | User token | `{ "title": "..." }` |
| Delete task | `DELETE /api/tasks/:taskId` | User token | Bearer token |
| Admin task list | `GET /api/admin/tasks` | Admin token | Optional `search` and `status` query parameters |
| Admin task status | `PATCH /api/admin/tasks/:taskId/status` | Admin token | `{ "status": "IN_PROGRESS" }` |
| Admin users | `GET /api/admin/users` | Admin token | Bearer token |
| List banners | `GET /api/admin/banners` | Admin token | Bearer token |
| Upload banner | `POST /api/admin/banners` | Admin token | Multipart form field named `image` |
| Delete banner | `DELETE /api/admin/banners/:bannerId` | Admin token | Bearer token |

Task statuses are `OPEN`, `IN_PROGRESS`, and `RESOLVED`. Task titles must be
3–150 characters. Passwords must be at least 6 characters. Banner uploads
must be images and are limited to 10 MB.

Important behavior in the current API:

- Registration returns a success message but does **not** log the user in.
  Follow registration with `POST /api/auth/login`.
- Login returns the token as `data.accessToken`. Send it on protected requests
  as `Authorization: Bearer <token>`.
- `/api/auth/me` is currently protected by both authentication and the admin
  role check. It is not available to ordinary users.
- Admin routes require a user whose role is already `admin`; the API does not
  provide an endpoint for changing a user's role.
- Google login starts with a browser navigation to `/api/auth/google`. Its
  callback currently returns JSON from the API rather than redirecting to a
  Next.js page.

## 4. Add a small typed API helper

In the Next.js project, add a helper such as `src/lib/api.ts` (adjust the
location to match your project's aliases). This keeps the base URL, bearer
header, JSON handling, and API errors in one place:

```ts
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not set");
}

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  accessToken?: string,
): Promise<ApiResponse<T>> {
  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  const result = (await response.json()) as ApiResponse<T>;
  if (!response.ok) {
    throw new Error(result.message ?? `API request failed (${response.status})`);
  }

  return result;
}
```

This helper expects API responses to be JSON, as the current routes do. For
file uploads, pass a `FormData` body and do not set `Content-Type` yourself;
the browser must add the multipart boundary.

## 5. Wire login and a task list

Login from a client-side form or event handler:

```ts
const result = await apiRequest<{ accessToken: string }>("/auth/login", {
  method: "POST",
  body: JSON.stringify({ email, password }),
});

const token = result.data?.accessToken;
if (!token) {
  throw new Error("The login response did not include an access token");
}
```

Use the token for task requests:

```ts
type Task = {
  id: string;
  title: string;
  status: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

const result = await apiRequest<{ tasks: Task[] }>("/tasks", {}, token);
const tasks = result.data?.tasks;
if (!tasks) {
  throw new Error("The task response did not include a task list");
}
```

The API currently accepts bearer tokens; it does not set an authentication
cookie or provide a refresh-token route. Keeping the token only in React
memory is simpler and avoids persistent browser storage, but users will need
to log in again after a reload. Persisting it in `localStorage` survives
reloads but increases the impact of a cross-site scripting bug. If you choose
that approach for a learning project, avoid rendering untrusted HTML and keep
dependencies current. For a production app, consider adding a backend
session/HTTP-only cookie flow rather than exposing long-lived credentials to
browser JavaScript.

Use the API from client-side event handlers for this bearer-token flow. A
Next.js server component does not automatically have the browser's token.
If you later add a server-side proxy or server actions, keep any server-only
configuration in non-`NEXT_PUBLIC_` variables.

For creating, renaming, and deleting tasks:

```ts
await apiRequest<{ task: Task }>("/tasks", {
  method: "POST",
  body: JSON.stringify({ title }),
}, token);

await apiRequest<{ task: Task }>(`/tasks/${taskId}`, {
  method: "PATCH",
  body: JSON.stringify({ title }),
}, token);

await apiRequest<never>(`/tasks/${taskId}`, {
  method: "DELETE",
}, token);
```

After a mutation, update or refetch the task list so the UI reflects the
server's response. Use the response's `data.task` when the route returns one.

## 6. Build the screens with shadcn/ui

A practical order is:

1. **Login/register** — use shadcn `Input`, `Label`, `Button`, and `Card`.
   Show validation and API error messages next to the form.
2. **Tasks** — fetch the authenticated user's tasks, add a task form, and
   provide rename/delete actions. Show loading, empty, and error states.
3. **Admin tasks/users** — call the admin routes with an admin token. The
   admin task list accepts `search` and `status`, for example
   `/admin/tasks?search=printer&status=OPEN`.
4. **Banners** — render the `image_url` values returned by the banner list.
   Upload using `FormData` with the field name `image`; do not JSON-encode a
   file.

For a banner upload:

```ts
const formData = new FormData();
formData.append("image", file);

await apiRequest<{ banner: unknown }>("/admin/banners", {
  method: "POST",
  body: formData,
}, token);
```

Restrict admin screens in the UI for a better experience, but do not treat
client-side route guards as authorization. The API's authentication and role
middleware is what protects data and actions.

## 7. Troubleshooting

- **Browser reports a network or CORS error:** confirm the API is running and
  the URL in Next.js `.env.local` is reachable from the browser. The current
  Express app uses permissive CORS; for deployment, restrict it to the actual
  frontend origin.
- **API returns 401/403:** check that the request includes
  `Authorization: Bearer <accessToken>` and that the account is an admin for
  admin routes.
- **API cannot connect to PostgreSQL/Redis:** if the API runs on your computer,
  use `localhost` plus the published host ports. If it runs inside Compose,
  use `postgres:5432` and `redis:6379`.
- **Database login fails:** make the user, password, database name, and
  published port in `DATABASE_URL` match the Compose configuration. Changing
  PostgreSQL's initial credentials does not change credentials already stored
  in an existing Docker volume.
- **A changed Next.js URL has no effect:** restart the Next.js development
  server after editing `.env.local`.
- **Google login fails:** verify the callback URL is registered with Google
  and exactly matches `GOOGLE_CALLBACK_URL`.

## Existing implementation references

- [API route mounting](../src/routes/index.ts)
- [Authentication routes](../src/routes/auth.routes.ts)
- [User task routes](../src/routes/user.task.routes.ts)
- [Admin task routes](../src/routes/admin.task.routes.ts)
- [Admin user routes](../src/routes/admin.users.routes.ts)
- [Admin banner routes](../src/routes/admin.banner.routes.ts)
- [Environment validation](../src/config/env.ts)



================================================
FILE: Guides/sql-queries-guide.md
================================================
# SQL Inspection Guide

This note explains how to connect to the PostgreSQL database in this project and run SQL queries to inspect what tables already exist.

## Database connection details

The app reads its database address from [.env](../.env):

```env
DATABASE_URL='postgresql://postgres:postgres@localhost:5441/nodejs-capstone-practice'
```

That means:

- host: `localhost`
- port: `5441`
- username: `postgres`
- password: `postgres`
- database: `nodejs-capstone-practice`

## Connect from a local shell

If the PostgreSQL client is installed locally, connect with:

```bash
psql -h localhost -p 5441 -U postgres -d nodejs-capstone-practice
```

When prompted, enter:

```text
postgres
```

You are now inside the database shell.

## Useful table inspection commands

Inside `psql`, run:

```sql
\dt
```

That lists the tables in the current database.

To inspect one table:

```sql
\d users
```

```sql
\d support_tasks
```

```sql
\d banners
```

## Read table contents

To check the rows in a table:

```sql
SELECT * FROM users;
```

```sql
SELECT * FROM support_tasks;
```

```sql
SELECT * FROM banners;
```

## Inspect the schema

To list all tables with their schema information:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

To see column names and types for a table:

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;
```

## Connect through the Docker container instead

You can also inspect the DB from inside the container:

```bash
docker exec -it nodejs-practice-postgres psql -U postgres -d nodejs-capstone-practice
```

Then run the same commands shown above:

```sql
\dt
SELECT * FROM users;
SELECT * FROM support_tasks;
SELECT * FROM banners;
```

## Migration table queries

If you want to inspect whether migration metadata exists, run:

```sql
SELECT * FROM pgmigrations;
```

If your older notes used a `migrations` table name, you can also try:

```sql
SELECT * FROM migrations;
```

That tells you whether the migration history was recorded in the database.



================================================
FILE: Guides/node-pg-migrate/README.md
================================================
# node-pg-migrate Setup and Project Changes

This guide explains how to replace the handwritten migration runner in this project with `node-pg-migrate`.

## 1) Install the migration tool

Run:

```powershell
npm install --save-dev node-pg-migrate
```

The environment already has `pg`, so no new runtime database driver is required for the migration layer.

## 2) Add the migration scripts

Update the `scripts` section of `package.json` so the project calls `node-pg-migrate` instead of the custom launcher.

Example replacement:

```json
"scripts": {
  "build": "tsc",
  "dev": "tsx src/server.ts",
  "start": "node dist/server.js",
  "docker-up": "docker compose up -d",
  "docker-down": "docker compose down",
  "migrate": "npx node-pg-migrate up",
  "migrate:down": "npx node-pg-migrate down",
  "migrate:create": "npx node-pg-migrate create",
  "migrate:status": "npx node-pg-migrate status"
}
```

This is the direct package-level replacement for the existing custom migration runner.

## 2a) What each migration script does

The package scripts in `package.json` are shortcuts for the `node-pg-migrate` CLI that this project’s installed version supports:

```json
"migrate": "npx node-pg-migrate up",
"migrate:down": "npx node-pg-migrate down",
"migrate:create": "npx node-pg-migrate create",
"migrate:redo": "npx node-pg-migrate redo"
```

- `npm run migrate` runs `node-pg-migrate up` and applies any migration file that has not yet been recorded in the database history table.
- `npm run migrate:down` runs `node-pg-migrate down` and rolls back the most recently applied migration.
- `npm run migrate:create` creates a new migration skeleton file for the next database change.
- `npm run migrate:redo` runs the latest migration in reverse and then applies it again.

The tool reads migration SQL files from the `migrations/` folder and uses a table called `pgmigrations` inside PostgreSQL to remember what has already been executed. That table is created automatically by `node-pg-migrate` when it first records migration history. In the docs example it is described as `migrations`, but the installed version’s CLI help reports the default table name as `pgmigrations`.

## 3) Stop using the custom migration script

The file `src/scripts/migrate.ts` is a manual implementation that loads SQL files and tracks them itself.

Remove that file from the runtime path:

```text
src/scripts/migrate.ts
```

That file should be deleted or left unused once `node-pg-migrate` is configured.

## 4) Keep the SQL files in the current folder

The project already stores SQL definitions under the `migrations/` directory.

That folder can remain the migration source for `node-pg-migrate` as long as the migration files are framed in the tool’s expected format.

## 5) Optional project-level config

If you want to make the migration folder explicit, add a config file in the root.

Example:

```js
module.exports = {
  migrationTable: "migrations",
  dir: "migrations",
  direction: "up",
  log: true,
};
```

You can then point the CLI at that config when needed.

## 6) Run the standard migration commands

Make sure `DATABASE_URL` is available in the environment before running these commands:

```powershell
npm run migrate
```

Rollback the latest migration:

```powershell
npm run migrate:down
```

Create a new migration file:

```powershell
npx node-pg-migrate create add_users_table --sql-file
```

## 7) Files to replace or remove

- `package.json`
- `src/scripts/migrate.ts` (remove)
- optionally add `node-pg-migrate.config.js`

This is the migration-level replacement for the current custom script setup.



================================================
FILE: Guides/zod/README.md
================================================
# Zod Setup and Project Changes

This document describes how to set up Zod and where to make exact changes in the project.

## 1) Install Zod

Run:

```powershell
npm install zod
```

No separate type package is required for TypeScript; Zod includes its own typings.

## 2) Update `package.json`

Add no new dependencies other than `zod`.

Example change in `package.json`:

```json
"dependencies": {
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "pg": "^8.22.0",
  "pino": "^10.3.1",
  "zod": "^4.0.0"
}
```

## 3) Replace env validation in `src/config/env.ts`

Current code uses a manual helper and throws generic `Error`.

Replace the file content with:

```ts
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z.string().default("info"),
  DATABASE_URL: z.url("DATABASE_URL must be a valid URL"),
});

const parsed = envSchema.parse(process.env);

export const env = {
  port: Number(parsed.PORT ?? 3000),
  isProduction: parsed.NODE_ENV === "production",
  nodeEnv: parsed.NODE_ENV,
  logLevel: parsed.LOG_LEVEL,
  databaseUrl: parsed.DATABASE_URL,
} as const;
```

This removes manual env checks and centralizes runtime validation.

## 4) Add request validation as a reusable schema

Create a dedicated validation folder and keep the auth request contract as a standalone Zod schema.

Create:

```text
src/validation/auth.schema.ts
```

Suggested file content:

```ts
import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

Then replace the route-file request parsing with imports from that schema file.

Suggested route shape:

```ts
import { Router } from "express";
import { authSchema } from "../validation/auth.schema";
import { loginUser, registerUser } from "../services/auth.service";

export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
  const parsed = authSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: parsed.error.flatten(),
    });
  }

  try {
    const { email, password } = parsed.data;
    await registerUser(email, password);

    return res.status(201).json({
      success: true,
      message: "User Registration is successfull. Please login to continue",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  const parsed = authSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: parsed.error.flatten(),
    });
  }

  try {
    const { email, password } = parsed.data;
    await loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
});
```

This keeps the request contract reusable and keeps the route file focused on HTTP wiring.

## 5) Remove the custom AppError class

Delete `src/errors/app-error.ts`.

Then change any service file imports from `AppError` to use plain `Error` or route-level responses.

Example replacement in `src/services/auth.service.ts`:

```ts
import {
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
} from "../repositories/user.repository";
import { BCRYPT_SALT_NUMBER, PASSWORD_LENGTH } from "../utils/constants";
import bcrypt from "bcryptjs";

export const registerUser = async (
  email: string,
  password: string,
): Promise<void> => {
  const normalizeEmail = email.toLowerCase().trim();

  const existingUser = await findUserByEmail(normalizeEmail);

  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_NUMBER);
  await createUser(normalizeEmail, passwordHash);
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<void> => {
  const normalizeEmail = email.toLowerCase().trim();
  const user = await findUserByEmailWithPassword(normalizeEmail);

  if (!user?.password_hash) {
    throw new Error("Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }
};
```

## 6) Update `src/middleware/error-handler.ts`

Replace the `AppError` branch with Zod-specific handling and default fallback.

Suggested file content:

```ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation error.",
      errors: err.errors,
    });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
};
```

If you want to preserve HTTP status semantics, handle known messages in route handlers and return the correct status there.

## 7) Where to make changes

Files to update for the Zod migration:

- `package.json`
- `src/config/env.ts`
- `src/routes/auth.routes.ts`
- `src/validation/auth.schema.ts` (new file)
- `src/middleware/error-handler.ts`
- `src/services/auth.service.ts`
- Remove `src/errors/app-error.ts`

These changes replace custom validation and custom error behavior with Zod and standard runtime errors.



================================================
FILE: migrations/001_enable_pgcrypto.sql
================================================
CREATE EXTENSION if NOT EXISTS "pgcrypto";


================================================
FILE: migrations/002_create_users_table.sql
================================================
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(225) NOT NULL UNIQUE,
  password_hash TEXT,
  google_id VARCHAR(225) UNIQUE,
  role VARCHAR(20) NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


================================================
FILE: migrations/003_create_support_tasks_table.sql
================================================
CREATE TABLE support_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(150) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED')),
  user_id uuid NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


================================================
FILE: migrations/004_create_banners_table.sql
================================================
CREATE TABLE banners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  cloudinary_public_id TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


================================================
FILE: src/app.ts
================================================
import express from "express";
import cors from "cors";
import { apiRouter } from "./routes";
import { notFound } from "./middleware/not-found";
import { errorHandler } from "./middleware/error-handler";

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};



================================================
FILE: src/server.ts
================================================
import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./lib/logger";

const app = createApp();

app.listen(env.port, () =>
  logger.info(`Server is now running on http://localhost:${env.port}`),
);



================================================
FILE: src/config/env.ts
================================================
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z.string().default("info"),
  DATABASE_URL: z.url("DATABASE_URL must be a valid postgres URL"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_EXPIRES_IN: z.string().default("30m"),
  CLOUDINARY_CLOUD_NAME: z.string().min(3, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(3, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_SECRET: z.string().min(3, "CLOUDINARY_SECRET is required"),
  REDIS_URL: z.string().min(3, "REDIS_URL is required"),
  GOOGLE_CLIENT_ID: z.string().min(3, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(3, "GOOGLE_CLIENT_SECRET is required"),
  GOOGLE_CALLBACK_URL: z.string().min(3, "GOOGLE_CALLBACK_URL is required"),
});

const parsed = envSchema.parse(process.env);

export const env = {
  port: Number(parsed.PORT ?? 3003),
  isProduction: parsed.NODE_ENV === "production",
  nodeEnv: parsed.NODE_ENV,
  logLevel: parsed.LOG_LEVEL,
  databaseUrl: parsed.DATABASE_URL,
  jwtSecret: parsed.JWT_SECRET,
  jwtExpiresIn: parsed.JWT_EXPIRES_IN,
  cloudinaryCloudName: parsed.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: parsed.CLOUDINARY_API_KEY,
  cloudinarySecret: parsed.CLOUDINARY_SECRET,
  redisUrl: parsed.REDIS_URL,
  googleClientId: parsed.GOOGLE_CLIENT_ID,
  googleClientSecret: parsed.GOOGLE_CLIENT_SECRET,
  googleRedirectUrl: parsed.GOOGLE_CALLBACK_URL,
} as const;



================================================
FILE: src/lib/cloudinary.ts
================================================
import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env";

type UploadResult = {
  secureUrl: string;
  publicId: string;
};

// configure cloudinary
cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key: env.cloudinaryApiKey,
  api_secret: env.cloudinarySecret,
});

export const uploadBannerImageToCloudinary = async (
  buffer: Buffer,
  options?: { folder?: string },
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: options?.folder,
      },

      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          secureUrl: result?.secure_url ?? "",
          publicId: result?.public_id ?? "",
        });
      },
    );
    // sending raw image bytes to cloudinary
    uploadStream.end(buffer);
  });
};

export async function deleteBannerImageFromCloudinary(
  publicId: string,
): Promise<void> {
  return cloudinary.uploader.destroy(publicId);
}



================================================
FILE: src/lib/db.ts
================================================
import { Pool } from "pg";
import { env } from "../config/env";

export const pool = new Pool({
  connectionString: env.databaseUrl,
});



================================================
FILE: src/lib/google.ts
================================================
import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env";
import { GoogleUserProfile } from "../types/google.types";

const googleOauthClient = new OAuth2Client(
  env.googleClientId,
  env.googleClientSecret,
  env.googleRedirectUrl,
);

export function getGoogleAuthUrl(): string {
  return googleOauthClient.generateAuthUrl({
    scope: ["openid", "email", "profile"],
    access_type: "online",
    prompt: "select_account",
  });
}

export async function getGoogleUserFromAuthCode(
  code: string,
): Promise<GoogleUserProfile> {
  if (!code) throw new Error("Google auth code is required.");

  const { tokens } = await googleOauthClient.getToken(code);
  if (!tokens.id_token)
    throw new Error("Google login failed. Missing id_token.");

  // user info recieved from google
  const ticketInfo = await googleOauthClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: env.googleClientId,
  });

  const payload = ticketInfo.getPayload();
  if (!payload?.sub || !payload.email)
    throw new Error("Google login failed. Invalid user profile.");

  return {
    googleId: payload.sub,
    email: payload.email.toLowerCase().trim(),
  };
}



================================================
FILE: src/lib/jwt.ts
================================================
import { env } from "../config/env";
import jwt, { SignOptions } from "jsonwebtoken";
import { TokenPayload } from "../types/user.types";

export const signAccessToken = (payload: TokenPayload): string => {
  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.jwtSecret, options);
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, env.jwtSecret) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired access token.");
  }
};



================================================
FILE: src/lib/logger.ts
================================================
import pino from "pino";
import { env } from "../config/env";

export const logger = pino({
  level: env.logLevel,
  transport: env.isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
        },
      },
});



================================================
FILE: src/lib/redis.ts
================================================
import Redis from "ioredis";
import { env } from "../config/env";

export const redis = new Redis(env.redisUrl);

const redisUrl = new URL(env.redisUrl);

export const bullmqConnection = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port),
  maxRetriesPerRequest: null,
};



================================================
FILE: src/lib/caching/banner.cache.ts
================================================
import { Banner } from "../../types/banner.types";
import { redis } from "../redis";

import {
  ADMIN_BANNERS_CACHE_KEY,
  ADMIN_BANNERS_CACHE_TTL_SECONDS,
} from "../../utils/constants";

export async function getBannersFromCache(): Promise<Banner[] | null> {
  const cacheData = await redis.get(ADMIN_BANNERS_CACHE_KEY);
  if (!cacheData) return null;

  return JSON.parse(cacheData) as Banner[];
}

export async function setBannerCache(banners: Banner[]): Promise<void> {
  await redis.set(
    ADMIN_BANNERS_CACHE_KEY,
    JSON.stringify(banners),
    "EX",
    ADMIN_BANNERS_CACHE_TTL_SECONDS,
  );
}

export async function clearBannersCache(): Promise<void> {
  await redis.del(ADMIN_BANNERS_CACHE_KEY);
}



================================================
FILE: src/lib/caching/user.task.cache.ts
================================================
import { Task } from "../../types/task.types";
import { redis } from "../redis";

import {
  USER_TASKS_CACHE_KEY,
  USER_TASKS_CACHE_TTL_SECONDS,
} from "../../utils/constants";

export async function getUserTasksFromCache(): Promise<Task[] | null> {
  const cacheData = await redis.get(USER_TASKS_CACHE_KEY);
  if (!cacheData) return null;

  return JSON.parse(cacheData) as Task[];
}

export async function getUserTaskFromCacheById(
  taskId: string,
): Promise<Task | null> {
  const USER_TASKS_WITH_ID_CACHE_KEY = `user:task:${taskId}`;

  const cacheData = await redis.get(USER_TASKS_WITH_ID_CACHE_KEY);
  if (!cacheData) return null;

  return JSON.parse(cacheData) as Task;
}

export async function setUserTasksCache(tasks: Task[]): Promise<void> {
  await redis.set(
    USER_TASKS_CACHE_KEY,
    JSON.stringify(tasks),
    "EX",
    USER_TASKS_CACHE_TTL_SECONDS,
  );
}

export async function setUserTaskCacheById(task: Task): Promise<void> {
  const USER_TASKS_WITH_ID_CACHE_KEY = `user:task:${task.id}`;

  await redis.set(
    USER_TASKS_WITH_ID_CACHE_KEY,
    JSON.stringify(task),
    "EX",
    USER_TASKS_CACHE_TTL_SECONDS,
  );
}

export async function clearUserTasksCache(): Promise<void> {
  await redis.del(USER_TASKS_CACHE_KEY);
}

export async function clearUserTasksCacheById(taskId: string): Promise<void> {
  const USER_TASKS_WITH_ID_CACHE_KEY = `user:task:${taskId}`;
  await redis.del(USER_TASKS_WITH_ID_CACHE_KEY);
}



================================================
FILE: src/middleware/admin.middleware.ts
================================================
import { Request, Response, NextFunction } from "express";

export const isAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  if (req.user?.role !== "ADMIN") {
    next(new Error("Access denied! Admin access is required."));
    return;
  }

  next();
};



================================================
FILE: src/middleware/auth.middleware.ts
================================================
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt";

export const isAuthenticated = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    next(new Error("Access denied! Access token is required."));
    return;
  }

  const token = authHeader.split(" ")[1];
  req.user = verifyAccessToken(token);

  next();
};



================================================
FILE: src/middleware/banner.middleware.ts
================================================
import multer from "multer";
import { MAX_IMAGE_FILE_SIZE } from "../utils/constants";

export const uploadBannerImage = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: MAX_IMAGE_FILE_SIZE },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image upload is allowed"));
      return;
    }

    cb(null, true);
  },
});

export const uploadSingleBannerImage = uploadBannerImage.single("image");



================================================
FILE: src/middleware/error-handler.ts
================================================
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation error.",
      errors: err.issues[0].message,
    });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
};



================================================
FILE: src/middleware/not-found.ts
================================================
import { Request, Response } from "express";

export const notFound = (_req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
};



================================================
FILE: src/queues/delete-cloudinary-image.queue.ts
================================================
import { Queue } from "bullmq";
import { bullmqConnection } from "../lib/redis";
import { DELETE_CLOUDINARY_IMAGE_JOB, QUEUE_NAME } from "../utils/constants";
import { DeleteCloudinaryImageJobDataType } from "../types/banner.types";

export const deleteCloudinaryImageQueue = new Queue(QUEUE_NAME, {
  connection: bullmqConnection,
});

export async function addDeleteCloudinaryImageJob(
  publicId: string,
): Promise<void> {
  const jobData: DeleteCloudinaryImageJobDataType = {
    publicId,
  };

  // add one job to our queue
  await deleteCloudinaryImageQueue.add(DELETE_CLOUDINARY_IMAGE_JOB, jobData, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 3000,
    },

    removeOnComplete: true,
    removeOnFail: false,
  });
}



================================================
FILE: src/repositories/admin.banner.repository.ts
================================================
import { pool } from "../lib/db";
import { Banner, DBBannerRow } from "../types/banner.types";

export const createBanner = async (
  imageUrl: string,
  cloudinaryPublicId: string,
): Promise<Banner | null> => {
  const result = await pool.query<DBBannerRow>(
    `INSERT INTO banners (image_url, cloudinary_public_id)
    VALUES ($1, $2)
    RETURNING id, image_url, cloudinary_public_id, created_at`,
    [imageUrl, cloudinaryPublicId],
  );

  return result.rows[0] ?? null;
};

export const getAllBanners = async (): Promise<Banner[] | null> => {
  const result = await pool.query<DBBannerRow>(
    `SELECT id, image_url, cloudinary_public_id, created_at
    FROM banners
    ORDER BY created_at DESC`,
  );

  return result.rows ?? null;
};

export const deleteBannerById = async (
  bannerId: string,
): Promise<string | null> => {
  const result = await pool.query<{ cloudinary_public_id: string }>(
    `DELETE FROM banners
    WHERE id = $1
    RETURNING cloudinary_public_id`,
    [bannerId],
  );

  return result.rows[0]?.cloudinary_public_id ?? null;
};



================================================
FILE: src/repositories/admin.task.repository.ts
================================================
import { pool } from "../lib/db";
import { AdminTaskListFilters, DBTaskRow, Task } from "../types/task.types";

export const getAllTasks = async (
  filters: AdminTaskListFilters,
): Promise<Task[] | null> => {
  const conditions: string[] = [];
  const values: unknown[] = [];

  let paramIndex = 1;

  if (filters.search) {
    conditions.push(`title ILIKE $${paramIndex}`);
    values.push(`%${filters.search}%`);
    paramIndex++;
  }

  if (filters.status) {
    conditions.push(`status = $${paramIndex}`);
    values.push(filters.status);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await pool.query<DBTaskRow>(
    `SELECT id, title, status, user_id, created_at, updated_at
    FROM support_tasks ${whereClause}
    ORDER BY created_at DESC`,
    values,
  );

  return result.rows ?? null;
};

export const updateTaskStatus = async (
  taskId: string,
  status: string,
): Promise<Task | null> => {
  const result = await pool.query<DBTaskRow>(
    `UPDATE support_tasks
    SET status = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING id, title, status, user_id, created_at, updated_at`,
    [status, taskId],
  );

  return result.rows[0] ?? null;
};



================================================
FILE: src/repositories/admin.users.repository.ts
================================================
import { pool } from "../lib/db";
import { DBUserRow, User } from "../types/user.types";

export const getUsers = async (): Promise<User[] | null> => {
  const result = await pool.query<DBUserRow>(
    `SELECT id, email, role, created_at
    FROM users
    ORDER BY created_at DESC`,
  );

  return result.rows ?? null;
};



================================================
FILE: src/repositories/user.repository.ts
================================================
import { pool } from "../lib/db";
import { DBUserRow, DBUserWithPasswordRow, User } from "../types/user.types";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query<DBUserRow>(
    `SELECT id, email, role, created_at FROM users WHERE email = $1`,
    [email],
  );

  return result.rows[0] ?? null;
};

export const createUser = async (
  email: string,
  passwordHash: string,
): Promise<User | null> => {
  const result = await pool.query<DBUserWithPasswordRow>(
    `INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, role, created_at`,
    [email, passwordHash],
  );

  return result.rows[0] ?? null;
};

export const findUserByEmailWithPassword = async (
  email: string,
): Promise<DBUserWithPasswordRow | null> => {
  const result = await pool.query<DBUserWithPasswordRow>(
    `SELECT id, email, password_hash, role, created_at
    FROM users WHERE email = $1`,
    [email],
  );

  return result.rows[0] ?? null;
};

export const findUserByGoogleId = async (
  googleId: string,
): Promise<User | null> => {
  const result = await pool.query<DBUserRow>(
    `SELECT id, email, role, created_at
    FROM users WHERE google_id = $1`,
    [googleId],
  );

  return result.rows[0] ?? null;
};

export const linkGoogleIdToUser = async (
  userId: string,
  googleId: string,
): Promise<User> => {
  const result = await pool.query<DBUserRow>(
    `UPDATE users
    SET google_id = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING id, email, role, google_id, updated_at`,
    [googleId, userId],
  );

  return result.rows[0];
};

export const createGoogleUser = async (
  email: string,
  googleId: string,
): Promise<User> => {
  const result = await pool.query<DBUserRow>(
    `INSERT into users (email, google_id)
    VALUES ($1, $2)
    RETURNING id, email, role, google_id, created_at`,
    [email, googleId],
  );

  return result.rows[0];
};



================================================
FILE: src/repositories/user.task.repository.ts
================================================
import { pool } from "../lib/db";
import { DBTaskRow, Task } from "../types/task.types";

export const createTask = async (
  userId: string,
  title: string,
): Promise<Task> => {
  const result = await pool.query<DBTaskRow>(
    `INSERT INTO support_tasks (user_id, title)
    VALUES ($1, $2)
    RETURNING id, title, status, user_id, created_at, updated_at`,
    [userId, title],
  );

  return result.rows[0] ?? null;
};

export const getTasksByUserId = async (
  userId: string,
): Promise<Task[] | null> => {
  const result = await pool.query<DBTaskRow>(
    `SELECT id, title, status, user_id, created_at, updated_at
    FROM support_tasks WHERE user_id = $1
    ORDER BY created_at DESC`,
    [userId],
  );

  return result.rows ?? null;
};

export const getTaskByIdAndUserId = async (
  taskId: string,
  userId: string,
): Promise<Task | null> => {
  const result = await pool.query<DBTaskRow>(
    `SELECT id, title, status, user_id, created_at, updated_at
    FROM support_tasks WHERE id = $1 AND user_id = $2`,
    [taskId, userId],
  );

  return result.rows[0] ?? null;
};

export const updateTaskTitle = async (
  taskId: string,
  userId: string,
  title: string,
): Promise<Task | null> => {
  const result = await pool.query<DBTaskRow>(
    `UPDATE support_tasks
    SET title = $1, updated_at = NOW()
    WHERE id = $2 AND user_id = $3
    RETURNING id, title, status, user_id, created_at, updated_at`,
    [title, taskId, userId],
  );

  return result.rows[0] ?? null;
};

export const deleteTask = async (
  taskId: string,
  userId: string,
): Promise<boolean> => {
  const result = await pool.query<DBTaskRow>(
    `DELETE FROM support_tasks
    WHERE id = $1 AND user_id = $2`,
    [taskId, userId],
  );

  // result.rowCount is the number of rows DB query affected/returned
  // 1 > 0 → true; if rowCount is 0 (no rows deleted) 0 > 0 → false
  return (result.rowCount ?? 0) > 0;
};



================================================
FILE: src/routes/admin.banner.routes.ts
================================================
import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";
import { uploadSingleBannerImage } from "../middleware/banner.middleware";
import { bannerSchema } from "../validation/banner.schema";

import {
  createAdminBanner,
  deleteAdminBanner,
  getAdminBanners,
} from "../services/admin.banner.service";

export const adminBannerRouter = Router();
adminBannerRouter.use(isAuthenticated, isAdmin);

adminBannerRouter.post(
  "/",
  uploadSingleBannerImage,
  async (req: Request, res: Response, next: NextFunction) => {
    const parsed = bannerSchema.safeParse(req.file);
    if (!parsed.success)
      return res.status(400).json({
        success: false,
        message: parsed.error.issues[0].message ?? "Image is required.",
      });

    try {
      const file = parsed.data;
      const banner = await createAdminBanner(file);

      res.status(201).json({
        success: true,
        message: "Banner uploaded successfully.",
        data: { banner },
      });
    } catch (error) {
      next(error);
    }
  },
);

adminBannerRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const banner = await getAdminBanners();

      res.status(200).json({
        success: true,
        message: "Banner uploaded successfully.",
        data: { banner },
      });
    } catch (error) {
      next(error);
    }
  },
);

adminBannerRouter.delete(
  "/:bannerId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bannerId = req.params.bannerId as string;
      await deleteAdminBanner(bannerId);

      res.status(200).json({
        success: true,
        message: "Banner deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  },
);



================================================
FILE: src/routes/admin.task.routes.ts
================================================
import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";
import { AdminTaskListQuery } from "../types/task.types";

import {
  getAdminTasks,
  updateAdminTaskStatus,
} from "../services/admin.task.service";

import { taskStatusSchema } from "../validation/task.schema";

export const adminTaskRouter = Router();
adminTaskRouter.use(isAuthenticated, isAdmin); // protects all routes

adminTaskRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await getAdminTasks(req.query as AdminTaskListQuery);

      res.status(200).json({
        success: true,
        message: "Tasks fetched successfully.",
        data: { tasks },
      });
    } catch (error) {
      next(error);
    }
  },
);

// update task status
adminTaskRouter.patch(
  "/:taskId/status",
  async (req: Request, res: Response, next: NextFunction) => {
    const parsed = taskStatusSchema.safeParse(req.body.status);
    if (!parsed.success)
      return res.status(400).json({
        success: false,
        message: parsed.error.issues[0].message ?? "Task status is required.",
      });

    try {
      const status = parsed.data;
      const taskId = req.params.taskId as string;
      const task = await updateAdminTaskStatus(taskId, status);

      res.status(200).json({
        success: true,
        message: "Fetched task successfully.",
        data: { task },
      });
    } catch (error) {
      next(error);
    }
  },
);



================================================
FILE: src/routes/admin.users.routes.ts
================================================
import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";
import { getAllUsers } from "../services/admin.users.service";

export const adminUsersRouter = Router();
adminUsersRouter.use(isAuthenticated, isAdmin); // protects all routes

// fetch all users
adminUsersRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsers();

      res.status(200).json({
        success: true,
        message: "Users fetched successfully.",
        data: { users },
      });
    } catch (error) {
      next(error);
    }
  },
);



================================================
FILE: src/routes/auth.routes.ts
================================================
import { Router, Request, Response, NextFunction } from "express";
import { authSchema } from "../validation/auth.schema";
import {
  loginUser,
  loginWithGoogle,
  registerUser,
  startGoogleLogin,
} from "../services/auth.service";
import { isAuthenticated } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";

export const authRouter = Router();

authRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const parsed = authSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({
        success: false,
        message:
          parsed.error.issues[0].message ?? "Email and password are required.",
      });

    try {
      const { email, password } = parsed.data;
      await registerUser(email, password);

      res.status(201).json({
        success: true,
        message: "User registered successfully.",
      });
    } catch (error) {
      next(error);
    }
  },
);

authRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const parsed = authSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({
        success: false,
        message:
          parsed.error.issues[0].message ?? "Email and password are required.",
      });

    try {
      const { email, password } = parsed.data;
      const { accessToken } = await loginUser(email, password);

      res.status(200).json({
        success: true,
        data: { accessToken },
        message: "Logged in successfully.",
      });
    } catch (error) {
      next(error);
    }
  },
);

authRouter.get("/google", async (_req: Request, res: Response) => {
  const googleAuthUrl = startGoogleLogin();
  res.redirect(googleAuthUrl);
});

authRouter.get(
  "/google/callback",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code = req.query.code as string | undefined;
      const { accessToken } = await loginWithGoogle(code ?? "");

      res.status(200).json({
        success: true,
        data: { accessToken },
        message: "Logged in successfully.",
      });
    } catch (error) {
      next(error);
    }
  },
);

// get current user information
authRouter.get(
  "/me",
  isAuthenticated,
  isAdmin,
  (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      data: { user: req.user },
    });
  },
);



================================================
FILE: src/routes/health.routes.ts
================================================
import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/health", (_req, res, _next) => {
  res.status(200).json({
    success: true,
    message: "Health route is working.",
  });
});



================================================
FILE: src/routes/index.ts
================================================
import { Router } from "express";
import { healthRouter } from "./health.routes";
import { authRouter } from "./auth.routes";
import { userTaskRouter } from "./user.task.routes";
import { adminTaskRouter } from "./admin.task.routes";
import { adminUsersRouter } from "./admin.users.routes";
import { adminBannerRouter } from "./admin.banner.routes";

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/tasks", userTaskRouter);
apiRouter.use("/admin/tasks", adminTaskRouter);
apiRouter.use("/admin/users", adminUsersRouter);
apiRouter.use("/admin/banners", adminBannerRouter);



================================================
FILE: src/routes/user.task.routes.ts
================================================
import { Router, Request, Response, NextFunction } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { taskSchema } from "../validation/task.schema";

import {
  createUserTask,
  deleteUserTask,
  getUserTasks,
  getUserTaskById,
  updateUserTask,
} from "../services/user.task.service";

export const userTaskRouter = Router();
userTaskRouter.use(isAuthenticated); // protects all routes with isAuthenticated

userTaskRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const parsed = taskSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({
        success: false,
        message: parsed.error.issues[0].message ?? "Task title is required.",
      });

    try {
      const { title } = parsed.data;
      const task = await createUserTask(req.user!.userId, title);

      res.status(201).json({
        success: true,
        message: "Task created successfully.",
        data: { task },
      });
    } catch (error) {
      next(error);
    }
  },
);

userTaskRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await getUserTasks(req.user!.userId);

      res.status(200).json({
        success: true,
        message: "Fetched tasks successfully.",
        data: { tasks },
      });
    } catch (error) {
      next(error);
    }
  },
);

userTaskRouter.get(
  "/:taskId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = req.params.taskId as string;
      const task = await getUserTaskById(taskId, req.user!.userId);

      res.status(200).json({
        success: true,
        message: "Fetched task successfully.",
        data: { task },
      });
    } catch (error) {
      next(error);
    }
  },
);

userTaskRouter.patch(
  "/:taskId",
  async (req: Request, res: Response, next: NextFunction) => {
    const parsed = taskSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({
        success: false,
        message: parsed.error.issues[0].message ?? "Task title is required.",
      });

    try {
      const { title } = parsed.data;
      const taskId = req.params.taskId as string;
      const task = await updateUserTask(taskId, req.user!.userId, title);

      res.status(200).json({
        success: true,
        message: "Updated task successfully.",
        data: { task },
      });
    } catch (error) {
      next(error);
    }
  },
);

userTaskRouter.delete(
  "/:taskId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = req.params.taskId as string;
      await deleteUserTask(taskId, req.user!.userId);

      res.status(200).json({
        success: true,
        message: "Task deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  },
);



================================================
FILE: src/services/admin.banner.service.ts
================================================
import { uploadBannerImageToCloudinary } from "../lib/cloudinary";
import { Banner } from "../types/banner.types";

import {
  clearBannersCache,
  getBannersFromCache,
  setBannerCache,
} from "../lib/caching/banner.cache";

import {
  createBanner,
  deleteBannerById,
  getAllBanners,
} from "../repositories/admin.banner.repository";
import { addDeleteCloudinaryImageJob } from "../queues/delete-cloudinary-image.queue";

export const createAdminBanner = async (
  file: Express.Multer.File | undefined,
): Promise<Banner> => {
  if (!file?.buffer) throw new Error("Image type is invalid.");

  const { secureUrl, publicId } = await uploadBannerImageToCloudinary(
    file.buffer,
    {
      folder: "nodejs-capstone-project",
    },
  );

  if (!secureUrl || !publicId)
    throw new Error("Cloudinary secureUrl or publicId error.");

  const banner = await createBanner(secureUrl, publicId);
  if (!banner) throw new Error("Unable to create Banner.");

  // invalidate the cache
  await clearBannersCache();

  return banner;
};

export const getAdminBanners = async (): Promise<Banner[]> => {
  const getCachedBanners = await getBannersFromCache();
  if (getCachedBanners) return getCachedBanners;

  // if no cache data, fetch data from DB
  const banners = await getAllBanners();
  if (!banners) throw new Error("Banners not found");

  // set data to cache
  await setBannerCache(banners);

  return banners;
};

export const deleteAdminBanner = async (bannerId: string): Promise<void> => {
  // delete from db and get the public id
  const publicId = await deleteBannerById(bannerId);
  if (!publicId) throw new Error("Banner not found");

  await clearBannersCache();

  // add BULLMQ job
  await addDeleteCloudinaryImageJob(publicId);
};



================================================
FILE: src/services/admin.task.service.ts
================================================
import {
  TaskStatus,
  AdminTaskListQuery,
  AdminTaskListResponse,
  Task,
} from "../types/task.types";

import {
  getAllTasks,
  updateTaskStatus,
} from "../repositories/admin.task.repository";

import { TASK_STATUS } from "../utils/constants";

export const getAdminTasks = async (
  query: AdminTaskListQuery,
): Promise<AdminTaskListResponse> => {
  const search = query.search?.trim() || undefined;
  const status = query.status?.trim() || undefined;

  if (status && !TASK_STATUS.includes(status as TaskStatus))
    throw new Error("Status must either be open, inprogress or resolved");

  const tasks = await getAllTasks({ search, status });
  if (!tasks) throw new Error("Tasks not found.");

  return {
    tasks,
  };
};

export const updateAdminTaskStatus = async (
  taskId: string,
  status: unknown,
): Promise<Task> => {
  if (typeof status !== "string" || !TASK_STATUS.includes(status as TaskStatus))
    throw new Error("Status must either be open, inprogress or resolved");

  const task = await updateTaskStatus(taskId, status);
  if (!task) throw new Error("Tasks not found.");

  return task;
};



================================================
FILE: src/services/admin.users.service.ts
================================================
import { getUsers } from "../repositories/admin.users.repository";
import { User } from "../types/user.types";

export const getAllUsers = async (): Promise<User[]> => {
  const users = await getUsers();
  if (!users) throw new Error("Users not found.");

  return users;
};



================================================
FILE: src/services/auth.service.ts
================================================
import {
  createGoogleUser,
  createUser,
  findUserByEmail,
  findUserByEmailWithPassword,
  findUserByGoogleId,
  linkGoogleIdToUser,
} from "../repositories/user.repository";

import bcrypt from "bcryptjs";
import { signAccessToken } from "../lib/jwt";
import { BCRYPT_SALT_NUMBER } from "../utils/constants";
import { getGoogleAuthUrl, getGoogleUserFromAuthCode } from "../lib/google";
import { User } from "../types/user.types";

export const registerUser = async (
  email: string,
  password: string,
): Promise<void> => {
  const normalizeEmail = email.toLowerCase().trim();

  //  check if user already exists
  const existingUser = await findUserByEmail(normalizeEmail);
  if (existingUser) throw new Error("Email already exists.");

  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_NUMBER);
  await createUser(normalizeEmail, passwordHash);
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ accessToken: string }> => {
  const normalizeEmail = email.toLowerCase().trim();

  // check if user exists in db
  const user = await findUserByEmailWithPassword(normalizeEmail);
  if (!user?.password_hash) throw new Error("Invalid email or password.");

  // compare password to db password hash
  const isPasswordValid = await bcrypt.compare(password, user?.password_hash);
  if (!isPasswordValid) throw new Error("Invalid email or password.");

  const accessToken = signAccessToken({
    userId: user?.id,
    email: user?.email,
    role: user?.role,
  });

  return { accessToken };
};

// google auth
export const startGoogleLogin = (): string => {
  return getGoogleAuthUrl();
};

const createAccessTokenForUser = (user: User): string => {
  return signAccessToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });
};

export const loginWithGoogle = async (
  code: string,
): Promise<{ accessToken: string }> => {
  const googleProfile = await getGoogleUserFromAuthCode(code);

  let user = await findUserByGoogleId(googleProfile.googleId);

  if (!user) {
    user = await findUserByEmail(googleProfile.email);

    if (user) {
      // link google account to the existing email
      user = await linkGoogleIdToUser(user.id, googleProfile.googleId);
    } else {
      // first time login -> create user in db
      user = await createGoogleUser(
        googleProfile.email,
        googleProfile.googleId,
      );
    }
  }

  const accessToken = createAccessTokenForUser(user);
  return { accessToken };
};



================================================
FILE: src/services/user.task.service.ts
================================================
import {
  clearUserTasksCache,
  getUserTasksFromCache,
  getUserTaskFromCacheById,
  setUserTasksCache,
  setUserTaskCacheById,
  clearUserTasksCacheById,
} from "../lib/caching/user.task.cache";

import {
  createTask,
  deleteTask,
  getTaskByIdAndUserId,
  getTasksByUserId,
  updateTaskTitle,
} from "../repositories/user.task.repository";

import { Task } from "../types/task.types";

export const createUserTask = async (
  userId: string,
  title: string,
): Promise<Task> => {
  const normalizeTitle = title.trim();
  const createdTask = await createTask(userId, normalizeTitle);

  // invalidate the cache
  await clearUserTasksCache();

  return createdTask;
};

export const getUserTasks = async (userId: string): Promise<Task[]> => {
  const getCachedUserTasks = await getUserTasksFromCache();
  if (getCachedUserTasks) return getCachedUserTasks;

  // if no cache data, fetch data from DB
  const tasks = await getTasksByUserId(userId);
  if (!tasks) throw new Error("Tasks not found");

  // set data to cache
  await setUserTasksCache(tasks);

  return tasks;
};

export const getUserTaskById = async (
  taskId: string,
  userId: string,
): Promise<Task> => {
  const getCachedUserTaskWithId = await getUserTaskFromCacheById(taskId);
  if (getCachedUserTaskWithId) return getCachedUserTaskWithId;

  // if no cache data, fetch data from DB
  const task = await getTaskByIdAndUserId(taskId, userId);
  if (!task) throw new Error("Task not found.");

  // set data to cache
  await setUserTaskCacheById(task);

  return task;
};

export const updateUserTask = async (
  taskId: string,
  userId: string,
  title: string,
): Promise<Task> => {
  const normalizeTitle = title.trim();
  const task = await updateTaskTitle(taskId, userId, normalizeTitle);
  if (!task) throw new Error("Task not found.");

  // invalidate the cache
  await clearUserTasksCache(); // clears cache list
  await clearUserTasksCacheById(taskId); // clears single task

  return task;
};

export const deleteUserTask = async (
  taskId: string,
  userId: string,
): Promise<void> => {
  const deletedTask = await deleteTask(taskId, userId);
  if (!deletedTask) throw new Error("Task not found.");

  // invalidate the cache
  await clearUserTasksCache(); // clears cache list
  await clearUserTasksCacheById(taskId); // clears single task
};



================================================
FILE: src/types/banner.types.ts
================================================
export type Banner = {
  id: string;
  image_url: string;
  cloudinary_public_id: string;
  created_at: Date;
  updated_at: Date;
};

export type DBBannerRow = Banner;

export type DeleteCloudinaryImageJobDataType = {
  publicId: string;
};



================================================
FILE: src/types/express.d.ts
================================================
import { TokenPayload } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};



================================================
FILE: src/types/google.types.ts
================================================
export type GoogleUserProfile = {
  googleId: string;
  email: string;
};



================================================
FILE: src/types/task.types.ts
================================================
import { TASK_STATUS } from "../utils/constants";

export type Task = {
  id: string;
  title: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
};

export type DBTaskRow = Task;

export type AdminTaskListQuery = {
  search?: string;
  status: string;
};

export type AdminTaskListFilters = {
  search?: string;
  status?: string;
};

export type AdminTaskListResponse = {
  tasks: Task[];
};

export type TaskStatus = (typeof TASK_STATUS)[number];



================================================
FILE: src/types/user.types.ts
================================================
export type User = {
  id: string;
  email: string;
  role: string;
  created_at: Date;
};

export type DBUserRow = {
  id: string;
  email: string;
  role: string;
  created_at: Date;
};

export type DBUserWithPasswordRow = DBUserRow & {
  password_hash: string | null;
};

export type TokenPayload = {
  userId: string;
  email: string;
  role: string;
};



================================================
FILE: src/utils/constants.ts
================================================
// validation
export const PASSWORD_LENGTH = 6;
export const BCRYPT_SALT_NUMBER = 10;
export const MIN_TASK_TITLE_LENGTH = 3;
export const MAX_TASK_TITLE_LENGTH = 150;

export const TASK_STATUS = ["OPEN", "IN_PROGRESS", "RESOLVED"] as const;

export const MAX_IMAGE_FILE_SIZE = 10 * 1024 * 1024; //10mb

// caching
export const ADMIN_BANNERS_CACHE_KEY = "admin:banners";
export const ADMIN_BANNERS_CACHE_TTL_SECONDS = 60;

export const USER_TASKS_CACHE_KEY = "user:tasks";
export const USER_TASKS_CACHE_TTL_SECONDS = 60;

// BullMQ
export const QUEUE_NAME = "cloudinary-jobs";
export const DELETE_CLOUDINARY_IMAGE_JOB = "delete-cloudinary-image";



================================================
FILE: src/validation/auth.schema.ts
================================================
import { z } from "zod";
import { PASSWORD_LENGTH } from "../utils/constants";

export const authSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(
      PASSWORD_LENGTH,
      `Password must be at least ${PASSWORD_LENGTH} characters long.`,
    ),
});



================================================
FILE: src/validation/banner.schema.ts
================================================
import { z } from "zod";
import { MAX_IMAGE_FILE_SIZE } from "../utils/constants";

export const bannerSchema = z
  .custom<Express.Multer.File>((file) => !!file, "Image file is required.")
  .refine(
    (file) => file?.size <= MAX_IMAGE_FILE_SIZE,
    "File size must not exceed 10MB.",
  )
  .refine(
    (file) => file?.mimetype?.startsWith("image/"),
    "Only image files are allowed.",
  );



================================================
FILE: src/validation/task.schema.ts
================================================
import { z } from "zod";

import {
  MAX_TASK_TITLE_LENGTH,
  MIN_TASK_TITLE_LENGTH,
  TASK_STATUS,
} from "../utils/constants";

export const taskSchema = z.object({
  title: z
    .string()
    .min(
      MIN_TASK_TITLE_LENGTH,
      `Title must be at least ${MIN_TASK_TITLE_LENGTH} characters long.`,
    )
    .max(
      MAX_TASK_TITLE_LENGTH,
      `Title cannot be at longer than ${MAX_TASK_TITLE_LENGTH} characters.`,
    ),
});

export const taskStatusSchema = z.enum(TASK_STATUS);

export const adminUpdateTaskSchema = z.object({
  title: z
    .string()
    .min(
      MIN_TASK_TITLE_LENGTH,
      `Title must be at least ${MIN_TASK_TITLE_LENGTH} characters long.`,
    )
    .max(
      MAX_TASK_TITLE_LENGTH,
      `Title cannot be at longer than ${MAX_TASK_TITLE_LENGTH} characters.`,
    )
    .optional(),
  status: taskStatusSchema.optional(),
});



================================================
FILE: src/workers/delete-cloudinary-image.worker.ts
================================================
import { Worker } from "bullmq";
import { DELETE_CLOUDINARY_IMAGE_JOB, QUEUE_NAME } from "../utils/constants";
import { DeleteCloudinaryImageJobDataType } from "../types/banner.types";
import { deleteBannerImageFromCloudinary } from "../lib/cloudinary";
import { bullmqConnection } from "../lib/redis";
import { logger } from "../lib/logger";

export const deleteCloudinaryImageWorker = new Worker(
  QUEUE_NAME,
  async (job) => {
    if (job.name !== DELETE_CLOUDINARY_IMAGE_JOB) return;

    const data = job.data as DeleteCloudinaryImageJobDataType;

    await deleteBannerImageFromCloudinary(data.publicId);
  },
  {
    connection: bullmqConnection,
  },
);

deleteCloudinaryImageWorker.on("completed", (job) =>
  logger.info(`Cloudinary delete job completed, ${job.id}`),
);

deleteCloudinaryImageWorker.on("failed", (job, error) =>
  logger.error({ err: error, jobId: job?.id }, "Cloudinary delete job failed"),
);

logger.info("Delete Cloudinary image worker started.");


