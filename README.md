# Veltro

> A self-hosted inventory management application built with React, Express, TypeScript, and MongoDB.

Veltro helps users manage their inventory through a simple web interface. Each user has their own authenticated inventory, with support for creating, editing, deleting, filtering, and viewing items.

> **Project status:** Under active development.

---

## Setup

For installation and setup instructions, see:

**[How to setup?](./SETUP.md)**

---

## Architecture

```text
Browser
   │
   ▼
React + Vite
   │
   │ HTTP Requests
   ▼
Express + TypeScript API
   │
   ▼
MongoDB
```

The application consists of three main parts:

* **Client** — React and Vite frontend responsible for the user interface.
* **Server** — Express and TypeScript backend responsible for authentication, inventory operations, and API logic.
* **Database** — MongoDB used for persistent storage of users and inventory data.

---

## Project Structure

```text
veltro/
│
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── api/               # API request logic
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # React context and state
│   │   ├── pages/             # Application pages
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── server/                    # Express + TypeScript backend
│   ├── src/
│   │   ├── configs/           # Application configuration
│   │   ├── controllers/       # Request handling logic
│   │   ├── middlewares/       # Express middleware
│   │   ├── models/            # MongoDB/Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Utility functions
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── compose.yml                # Container orchestration
├── SETUP.md                   # Setup instructions
└── README.md                  # Project documentation
```
---

## API Endpoints

### Authentication

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| `POST` | `/api/auth/register` | Register a new user         |
| `POST` | `/api/auth/login`    | Log in                      |
| `POST` | `/api/auth/logout`   | Log out                     |
| `GET`  | `/api/auth/is-auth`  | Check authentication status |

### Inventory

All inventory routes require authentication.

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| `GET`  | `/api/item/fetch`  | Fetch inventory items  |
| `POST` | `/api/item/add`    | Add an item            |
| `POST` | `/api/item/edit`   | Edit an item           |
| `POST` | `/api/item/delete` | Delete an item         |
| `POST` | `/api/item/filter` | Filter inventory items |

---

## Maintainer

Developed and maintained by **Ajeet (alloy01)**.
