# ServicePilot

ServicePilot is a beginner portfolio project for learning IT Support and IT Service Management. This first milestone is a small project foundation: an Expo app, a FastAPI health endpoint, PostgreSQL configuration, and automated checks.

There is no authentication, ticket management, or AI feature in this milestone.

## What you need

- Python 3.11 or newer
- Node.js 22.13 or newer and npm
- Docker Desktop for the PostgreSQL service (optional for the API health check)
- Android Studio for an Android emulator, or Xcode on macOS for an iOS simulator

## Run the API

Open a terminal in the project folder:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -e ".[test]"
uvicorn app.main:app --reload
```

The API runs at `http://localhost:8000`. Open `http://localhost:8000/health` to check that it is responding. This endpoint does not require PostgreSQL.

## Run the Expo app

Open a second terminal:

```powershell
cd mobile
npm install
npm run start
```

Press `w` for web or `a` for an Android emulator. To launch the web target directly, use `npm run web`. The iOS simulator requires macOS; on a Mac, press `i` or run `npm run ios`.

The app checks `http://localhost:8000/health` by default. For an Android emulator, create `mobile/.env` with `EXPO_PUBLIC_API_URL=http://10.0.2.2:8000`. `EXPO_PUBLIC_*` values are included in the client app, so never put passwords or secret keys in them.

## Run PostgreSQL with Docker Compose

Copy `.env.example` to `.env` and replace the example database password with a local password. Then run from the project folder:

```sh
docker compose up --build
```

This starts PostgreSQL and the API. Stop the services with `docker compose down`. The `.env` file is ignored by Git; do not commit it.

## Run the checks

```sh
cd backend
python -m pip install -e ".[test]"
python -m pytest
```

```sh
cd mobile
npm install
npx expo export --platform web
npm run typecheck
```

GitHub Actions runs the backend tests, checks Expo's TypeScript types and exports the app for web on pushes and pull requests.

## Project layout

```text
backend/                 FastAPI application and pytest tests
mobile/                  Expo + React Native app (web, Android, iOS)
.github/workflows/ci.yml GitHub Actions checks
docker-compose.yml       PostgreSQL and API services
.env.example             Local environment variable template
AGENTS.md                Setup and contribution notes
```

## Next milestones

This foundation intentionally stays small. Add one feature at a time in a later milestone, starting with a clearly scoped IT support workflow.
