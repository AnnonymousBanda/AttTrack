<div align="center">

# 📋 AttTrack

**A cross-platform attendance tracker for IIT Patna students**

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

</div>

---

## ✨ About

AttTrack is a cross-platform app that helps students of **IIT Patna** track their lecture attendance.

The app automatically retrieves the timetable from branch-specific departmental Google Sheets maintained by Class Representatives. It leverages the **Google Sheets GViz Table Feed API** for lightning-fast data retrieval.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| 🎨 **Frontend** | ![React Native](https://img.shields.io/badge/React_Native-61DAFB?logo=react&logoColor=black) |
| ⚙️ **Backend** | ![Express](https://img.shields.io/badge/Express.js-black?logo=express) |
| 🗃️ **ORM** | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white) |
| 🐬 **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white) |
| 🚀 **Cache / Queue** | ![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white) |

---

## 📁 Project Structure

```
AttTrack/
├── client/    # React Native app
└── server/    # Express + Prisma + MySQL + Redis API
```

---

## 🚀 Installation

Clone the repository to get started — the steps below apply to whichever part of the app you want to set up next (frontend and/or backend).

```bash
git clone https://github.com/AnnonymousBanda/AttTrack
cd AttTrack
```

> [!NOTE]
> Once cloned, jump to the relevant section below: **Frontend Setup** or **Backend Setup**.

---

## 📱 Frontend Setup

> [!IMPORTANT]
> 🚧 Coming soon — frontend (React Native) setup steps will be added here.

---

## 🖥️ Backend Setup

### ✅ Prerequisites

Make sure you have the following installed before proceeding:

- 🟢 [Node.js](https://nodejs.org/) (v18 or later recommended)
- 📦 [npm](https://www.npmjs.com/)
- 🐬 [MySQL](https://dev.mysql.com/downloads/) (running instance, local or remote)
- 🔴 [Redis](https://redis.io/) (setup instructions below)
- 🔧 [Git](https://git-scm.com/)

### 1️⃣ Move into the server directory

```bash
cd server
```

### 2️⃣ Install dependencies

```bash
npm i
```

### 3️⃣ Set up environment variables

Copy the example env file and fill in your own values:

```bash
cp .env.example .env
```

> [!WARNING]
> Open `.env` and configure the required variables (database URL, Redis connection details, JWT secrets, Google Sheets API config, etc.) **before** proceeding to the next steps.

### 4️⃣ Set up Prisma

Initialize Prisma (if not already set up) and generate the Prisma Client:

```bash
npx prisma init
npx prisma generate
```

> [!TIP]
> `npx prisma init` only needs to be run once when setting up Prisma for the first time in the project. If `prisma/schema.prisma` already exists, skip this step.

### 5️⃣ Run database migrations and seed the database

```bash
npx prisma migrate deploy
npx prisma db seed
```

This applies all pending migrations to your MySQL database and seeds it with the initial required data.

### 6️⃣ Set up Redis

Redis is used for caching and session/queue management. Choose **one** of the following methods based on your OS:

<details>
<summary>🪟 <strong>Option A: Windows (via WSL)</strong></summary>

<br>

1. Open your WSL (Ubuntu) terminal.
2. Install Redis:

   ```bash
   sudo apt update
   sudo apt install redis-server
   ```
3. Start the Redis server:

   ```bash
   sudo service redis-server start
   ```
4. Verify it's running:

   ```bash
   redis-cli ping
   # Should return: PONG
   ```

</details>

<details>
<summary>🐳 <strong>Option B: Docker (Recommended, any OS)</strong></summary>

<br>

1. Make sure [Docker](https://www.docker.com/) is installed and running.
2. Pull and run the Redis container:

   ```bash
   docker run --name atttrack-redis -p 6379:6379 -d redis
   ```
3. Verify it's running:

   ```bash
   docker exec -it atttrack-redis redis-cli ping
   # Should return: PONG
   ```
4. To stop/start the container later:

   ```bash
   docker stop atttrack-redis
   docker start atttrack-redis
   ```

</details>

<details>
<summary>🐧 <strong>Option C: Linux</strong></summary>

<br>

1. Install Redis:

   ```bash
   sudo apt update
   sudo apt install redis-server
   ```
2. Start the Redis server:

   ```bash
   sudo systemctl start redis-server
   ```
3. (Optional) Enable Redis to start on boot:

   ```bash
   sudo systemctl enable redis-server
   ```
4. Verify it's running:

   ```bash
   redis-cli ping
   # Should return: PONG
   ```

</details>

<details>
<summary>🍎 <strong>Option D: macOS</strong></summary>

<br>

1. Install Redis using [Homebrew](https://brew.sh/):

   ```bash
   brew install redis
   ```
2. Start the Redis server:

   ```bash
   brew services start redis
   ```
3. Verify it's running:

   ```bash
   redis-cli ping
   # Should return: PONG
   ```

</details>

> [!NOTE]
> Make sure the Redis host/port in your `.env` file matches the instance you've set up (default: `localhost:6379`).

### 7️⃣ Start the server

**Development mode** (with hot-reload):

```bash
npm run dev
```

**Production mode**:

```bash
npm start
```

> [!TIP]
> 🎉 The server should now be running and ready to accept requests!