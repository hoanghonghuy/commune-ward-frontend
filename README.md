# Commune Ward Frontend

A React Single Page Application (SPA) for searching Vietnam administrative unit mergers.

## Features

- **Search**: Commune/ward name and province/city filtering with debounce.
- **Persistence**: Search state preserved via localStorage.
- **UI**: Responsive design, dark/light mode, pagination, and toast notifications.
- **Stack**: React 19, Vite 7, Tailwind CSS 3, Shadcn/UI.

## Installation

```bash
# Clone
git clone <repository-url>
cd commune-ward-frontend

# Install
npm install

# Configure
cp .env.example .env

# Run
npm run dev
```

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000` | Backend API URL |
| `VITE_API_TIMEOUT` | `30000` | Request timeout (ms) |
| `VITE_ENABLE_DEBUG` | `false` | Enable console logging |

## Scripts

- `npm run dev`: Start development server (localhost:5173).
- `npm run build`: Build for production (output to `dist/`).
- `npm run lint`: Check code quality.

## Project Structure

```
src/
├── components/     # UI components (Shadcn/UI & custom)
├── hooks/          # Custom hooks (useCommuneSearch, useDebounce)
├── lib/            # Utilities
├── App.jsx         # Root component
└── main.jsx        # Entry point
```

## Note

Requires a running backend API. Frontend-only (no internal database).