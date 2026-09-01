# How to Set Up Veltro

There are two ways to set up Veltro:

1. **Local / Manual Setup**
2. **Containerized Setup**

## Local vs. Containerized Setup

| Local Setup                                                                                              | Containerized Setup                                                                        |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Lower resource usage** because services run directly on the host machine.                              | **Higher resource usage** due to container runtime overhead and isolated services.         |
| Can be more **error-prone** due to differences in package versions, operating systems, and dependencies. | Provides a more **consistent environment** across different machines.                      |
| Services and dependencies must be installed and managed directly on the host machine.                    | Services can be easily started, stopped, recreated, and removed using container commands.  |
| Usually provides **faster development and debugging**, especially for small projects.                    | Can be slightly **slower to develop and debug** because of the additional container layer. |
| Dependencies can affect the host system and potentially conflict with other projects.                    | Dependencies are isolated, reducing conflicts with the host system and other projects.     |
| Best for developers who want direct control and minimal resource overhead.                               | Best for users and developers who want reproducible and isolated environments.             |

---

## Local Setup

### 1. Install Node.js

Download and install Node.js from:

[Node.js Download Page](https://nodejs.org/en/download?utm_source=chatgpt.com)

### 2. Verify Node.js and npm Installation

Run the following commands:

```bash
node -v
npm -v
```

It is recommended to use:

* Node.js version **24 or later**
* npm version **11 or later**

---

### 3. Clone or Download the Repository

#### Clone Method

```bash
git clone https://github.com/alloy01/veltro.git
cd veltro
```

If you encounter any issues with the `cd` command, manually open the project folder in your preferred code editor.

#### ZIP Method

Download the repository as a `.zip` file, extract it, and open the extracted folder in your preferred code editor.

---

### 4. Install Dependencies

Install the required npm packages in both the `client` and `server` directories.

```bash
npm install
```

---

### 5. Install MongoDB

> This step is optional if you are using a MongoDB Atlas connection string.

Install the MongoDB server (`mongod`) and optionally MongoDB Compass from:

[MongoDB Community Downloads](https://www.mongodb.com/try/download/community?utm_source=chatgpt.com)

---

### 6. Configure Environment Variables

Create a `.env` file in both the `client` and `server` directories.

#### Client `.env`

```env
VITE_API_URL=http://localhost:3000/api
```

#### Server `.env`

```env
MONGODB_URI=mongodb://127.0.0.1:27017

# Alternatively, use your MongoDB Atlas connection string

CLIENT_URL=http://localhost:5173

NODE_ENV=development

JWT_SECRET=your-secret-key

PORT=6000
```

> **Important:** If you change the server `PORT`, make sure `VITE_API_URL` points to the same port.

---

### 7. Compile the TypeScript Files

Run this command inside the `server` directory:

```bash
npm run compile
```

---

### 8. Start the Server

Run the following command inside the `server` directory:

```bash
npm run start
```

The output should be similar to:

```text
Server has been started on port: 6000
Database was connected successfully
```

---

### 9. Start the Client

Run the following command inside the `client` directory:

```bash
npm run dev
```

The output should be similar to:

```text
Local: http://localhost:5173/
```

---

### 10. Open Veltro

Open the URL displayed by Vite in your browser, usually:

```text
http://localhost:5173/
```

---

### 11. Debugging

If you encounter any errors:

* **Server errors** will generally appear in the server terminal.
* **Client-side errors** can be found in the browser's Developer Tools console.
