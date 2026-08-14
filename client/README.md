# Veltro Client

The frontend application for **Veltro**, an inventory management platform designed to help users manage and monitor their stock efficiently.

## Tech Stack

* **React** — UI development
* **React Router** — Client-side routing
* **Axios** — HTTP requests to the backend API
* **Tailwind CSS** — Styling
* **Vite** — Development server and build tool
* **ESLint** — Code quality and linting

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm

### Installation

Clone the repository and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Vite will start the development server and provide a local URL in the terminal.

### Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint:

```bash
npm run lint
```

## Project Structure

```text
client/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images and other frontend assets
│   ├── components/  # Reusable UI components
│   ├── pages/       # Application pages
│   ├── routes/      # Routing configuration
│   ├── services/    # API and external-service logic
│   ├── hooks/       # Custom React hooks
│   ├── App.jsx      # Root application component
│   └── main.jsx     # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

> Update the structure above if your actual Veltro folder structure differs.

## Frontend Architecture

The client follows a component-based React architecture.

```text
User
  ↓
React UI
  ↓
Components / Pages
  ↓
API Service Layer
  ↓
Axios
  ↓
Veltro Backend API
  ↓
Database
```

The frontend is responsible for:

* Rendering the user interface
* Client-side navigation
* Managing UI state
* Sending requests to the backend
* Handling API responses
* Displaying loading and error states
* Providing a responsive interface

Business logic that requires server-side validation or database access should remain on the backend.

## API Communication

API requests are handled using **Axios**.

Keep API communication separated from UI components where practical. This makes components easier to maintain and makes backend changes less painful.

Example:

```js
import axios from "axios";

const response = await axios.get("/api/items");
```

## Environment Variables

Environment-specific configuration should not be hardcoded into the source code.

For Vite, client-exposed environment variables should use the `VITE_` prefix.

Example:

```env
VITE_API_URL=http://localhost:5000
```

Access them through:

```js
import.meta.env.VITE_API_URL
```

Never place secrets, private API keys, database credentials, or other sensitive values in frontend environment variables. Anything exposed to a Vite client can ultimately be inspected by users.

## Available Scripts

| Command           | Purpose                  |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Create production build  |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Development Principles

### Components

Keep components focused on a single responsibility where possible.

### API Logic

Avoid scattering API requests throughout large components. Prefer a dedicated service/API layer as the application grows.

### State

Keep state as close as possible to where it is actually needed. Avoid global state unless multiple unrelated parts of the application genuinely need the same data.

### Styling

Use Tailwind CSS consistently and avoid unnecessary one-off styling solutions.

### Error Handling

API failures should be handled explicitly rather than assuming every request succeeds.

The UI should account for:

* Loading states
* Successful responses
* Empty states
* API errors
* Authentication failures
* Network failures

## Backend Dependency

The client depends on the Veltro backend for server-side functionality and persistent data.

Make sure the backend is running and configured correctly when developing the frontend locally.

## Production

Build the frontend with:

```bash
npm run build
```

The generated `dist/` directory contains the production assets.

The frontend can then be served through a static hosting provider or web server.

---

## Veltro

**Veltro** is an inventory management project focused on providing a practical, maintainable full-stack application.

This directory contains only the frontend application. For backend architecture, API documentation, database design, authentication, and server-side development, refer to the backend documentation.
