# Veltro

> A self-hosted inventory management application built with React, Express, TypeScript, and MongoDB.

Veltro helps users manage their inventory through a simple web interface. Each user has their own authenticated inventory, with support for creating, editing, deleting, filtering, and viewing items.

> **Project status:** Under active development.

---

## Features

- User registration and login
- JWT-based authentication
- Cookie-based authenticated sessions
- Protected inventory routes
- Create inventory items
- Edit inventory items
- Delete inventory items
- Filter inventory items
- User-specific inventory data
- MongoDB persistence
- REST API backend

---

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- CORS
- dotenv

---

## Project Structure

```text
veltro/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── api/
│   └── package.json
│
├── server/                 # Express + TypeScript backend
│   ├── src/
│   │   ├── configs/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── dist/               # Generated after TypeScript compilation
│   └── package.json
│
└── README.md
```

---

# Installation

## Prerequisites

Install the following before running Veltro locally:

- **Node.js** (LTS recommended)
- **npm**
- **MongoDB** — either MongoDB Community Edition or a MongoDB Atlas database

Verify Node.js and npm:

```bash
node -v
npm -v
```

---

## 1. Clone the repository

```bash
git clone <repository-url>
cd veltro
```

If you downloaded the project as a ZIP, extract it and open a terminal inside the project folder.

---

## 2. Install backend dependencies

```bash
cd server
npm install
```

---

## 3. Configure backend environment variables

Create a `.env` file inside the `server` directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=4000
CLIENT_URL=http://localhost:5173
```

### MongoDB URI examples

For a local MongoDB server:

```env
MONGODB_URI=mongodb://127.0.0.1:27017
```

For MongoDB Atlas, use the connection string provided by your Atlas cluster.

Veltro currently connects to the `veltro` database by appending `/veltro` to `MONGODB_URI`.

> Never commit `.env` files containing secrets or database credentials.

---

## 4. Build and start the backend

From the `server` directory:

```bash
npx tsc
npm start
```

This compiles the TypeScript source code into `dist` and starts the backend.

By default, the API runs at:

```text
http://localhost:4000/api
```

Expected response:

```text
API is working...
```

---

## 5. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
```

---

## 6. Configure the frontend

Create `client/.env`:

```env
VITE_API_URL=http://localhost:4000/api
```

---

## 7. Start the frontend

```bash
npm run dev
```

Vite will print the local URL in the terminal, usually:

```text
http://localhost:5173
```

Open it in your browser.

---

# Running the Application

You need two terminals.

### Terminal 1 — Backend

```bash
cd server
npx tsc
npm start
```

### Terminal 2 — Frontend

```bash
cd client
npm run dev
```

---

# API Routes

## Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Log in |
| `POST` | `/api/auth/logout` | Log out |
| `GET` | `/api/auth/is-auth` | Check authentication status |

## Inventory

All inventory routes require authentication.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/item/fetch` | Fetch inventory items |
| `POST` | `/api/item/add` | Add an item |
| `POST` | `/api/item/edit` | Edit an item |
| `POST` | `/api/item/delete` | Delete an item |
| `POST` | `/api/item/filter` | Filter inventory items |

---

# Environment Variables

## Backend — `server/.env`

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection URI without the final `/veltro` suffix |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `PORT` | Port used by the Express server |
| `CLIENT_URL` | Frontend URL allowed by CORS |

## Frontend — `client/.env`

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Base URL of the backend API |

---

# Useful Commands

## Frontend

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Backend

```bash
npx tsc          # Compile TypeScript into dist
npm start        # Start compiled backend
```

---

# Development Notes

- Backend source code lives in `server/src`.
- Compiled backend files are generated in `server/dist`.
- The frontend communicates with the backend through `VITE_API_URL`.
- CORS allows the origin specified by `CLIENT_URL`.
- Inventory routes are protected by authentication middleware.
- Environment variables and secrets should never be committed to the repository.

---

# Docker

Docker support is **not currently included in this repository**.

The project currently uses the local installation steps above. Dockerization is a planned improvement that could allow the complete application stack to run consistently across different machines.

A future setup could look like:

```text
React / Vite
      ↓
Express API
      ↓
MongoDB
```

managed together with Docker Compose.

---

# Roadmap

- [ ] Full Docker and Docker Compose support
- [ ] Automated tests
- [ ] Responsive UI improvements
- [ ] API validation and improved error handling
- [ ] Production deployment
- [ ] CI/CD pipeline
- [ ] Additional inventory management features

---

# Contributing

Contributions, bug reports, feature requests, and documentation improvements are welcome.

---

# License

A license has not yet been added to this project.

---

## Maintainer

Developed and maintained by **alloy01**.
