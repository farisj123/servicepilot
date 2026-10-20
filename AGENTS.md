# ServicePilot contributor instructions

ServicePilot is a beginner portfolio project for learning IT Support and IT Service Management.

## Project areas

- `mobile/` is the Expo, React Native and TypeScript app for web, Android and iOS.
- `backend/` is the Python FastAPI API. Keep API tests in `backend/tests/`.
- `docker-compose.yml` starts PostgreSQL and the API.

## Beginner setup

- API: `cd backend`, create a virtual environment with `python -m venv .venv`, activate it, install `python -m pip install -e ".[test]"`, then run `uvicorn app.main:app --reload`.
- Expo: `cd mobile`, run `npm install`, then `npm run start`. Press `w` for web or `a` for Android.
- PostgreSQL: copy `.env.example` to `.env`, set a local database password, and run `docker compose up --build` from the project root.

## Scope and safety

- Keep the first milestone focused on the project foundation and health check. Do not add authentication, ticket management, or AI features unless the user asks for them.
- Read existing files before editing them and preserve unrelated work.
- Never commit `.env`, passwords, access tokens, or other secrets. Expo `EXPO_PUBLIC_*` variables are public client configuration and must not contain secrets.
- Keep changes on the feature branch. Do not push to `main` or merge a pull request without user approval.

## Checks

- API: from `backend/`, run `python -m pytest`.
- Expo types: from `mobile/`, run `npm run typecheck`.
- Expo web export: from `mobile/`, run `npx expo export --platform web`.
- Report the actual result of every check; do not claim a check passed unless it was run.
