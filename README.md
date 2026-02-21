# 📝 Fullstack Task Management System

A production-ready Task Management Application built to demonstrate practical full-stack development skills. The project features a robust RESTful API backend and a responsive, modern frontend.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Zustand, Tailwind CSS, Axios, Lucide React (Icons)
- **Backend:** Node.js, Express.js, Prisma ORM
- **Database:** PostgreSQL

---

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites
- Node.js
- PostgreSQL

### 1. Backend Setup
Navigate to the backend directory:
```bash
cd backend
npm install
```
Create a .env file in the backend directory and add your database URL:
```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Push the schema to your database and start the server:
```bash
npx prisma db push
npm run dev
```

The backend server will start on http://localhost:3000

### 2. Frontend Setup
Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend application will start on http://localhost:5173
