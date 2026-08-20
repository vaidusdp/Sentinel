# 🛡️ Sentinel

**Sentinel** is a high-performance, modular backend API built with **Node.js**, **Express**, **TypeScript**, **Prisma ORM**, and **Supabase (PostgreSQL)**. It features secure user authentication powered by **Argon2** password hashing, **JWT (JSON Web Tokens)**, robust **Zod** schema validation, and **Role-Based Access Control (RBAC)**.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
  - [User Routes (`/api/v1/users`)](#user-routes-apiv1users)
- [Security Features](#-security-features)
- [Scripts](#-scripts)

---

## ✨ Features

- 🔐 **Secure Authentication**: Password hashing using **Argon2** (winner of the Password Hashing Competition).
- 🔑 **JWT Authorization**: Bearer token authentication with configurable expiry.
- 🛡️ **Role-Based Access Control (RBAC)**: Support for `USER`, `ADMIN`, and `DEVELOPER` roles.
- 📐 **Schema Validation**: Strict request payload validation using **Zod**.
- 🗄️ **Database & ORM**: PostgreSQL integration hosted on **Supabase** via **Prisma ORM** with `@prisma/adapter-pg` driver adapter.
- ⚡ **Modern TypeScript Stack**: Built using ES Modules, Express v5, and live reloading via `tsx`.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript (`^7.0.2`)
- **Framework**: Express.js (`^5.2.1`)
- **Database**: PostgreSQL (hosted on Supabase)
- **ORM**: Prisma (`^7.9.1`)
- **Validation**: Zod (`^4.4.3`)
- **Authentication**: `jsonwebtoken`, `argon2`
- **Development Tooling**: `tsx`, `nodemon`, `prettier`

---

## 📂 Project Architecture

```text
Sentinel/
├── prisma/
│   └── schema.prisma        # Prisma data models & DB config
├── generated/
│   └── prisma/              # Prisma client generated output
├── src/
│   ├── controllers/         # Express request handlers
│   │   └── user.controllers.ts
│   ├── db/                  # Database connections (Prisma & Supabase)
│   │   ├── prisma.ts
│   │   └── supabase.ts
│   ├── middlewares/         # Auth & Role-based access control middlewares
│   │   ├── auth.middlewares.ts
│   │   └── role.middlewares.ts
│   ├── routes/              # Express API endpoints
│   │   └── user.routes.ts
│   ├── services/            # Core business logic & database queries
│   │   ├── project.services.ts
│   │   └── user.services.ts
│   ├── utils/               # JWT & Password utility functions
│   │   ├── jwt.ts
│   │   └── password.ts
│   ├── validators/          # Zod validation schemas
│   │   └── user.validators.ts
│   └── index.ts             # Application entry point
├── .env                     # Environment variables configuration
├── package.json
└── tsconfig.json
```

---

## 🗃️ Database Schema

### Models & Enums

#### `UserRole` (Enum)
- `USER`
- `ADMIN`
- `DEVELOPER`

#### `User`
| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `@default(uuid())` | Unique User ID |
| `name` | `String` | | Full name |
| `email` | `String` | `@unique` | Unique email address |
| `password` | `String` | | Argon2 hashed password |
| `role` | `UserRole` | `@default(USER)` | Assigned user role |
| `createdAt` | `DateTime` | `@default(now())` | Account creation timestamp |
| `updatedAt` | `DateTime` | `@updatedAt` | Account update timestamp |

#### `Project`
| Field | Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `id` | `String` | `@id`, `@default(uuid())` | Unique Project ID |
| `name` | `String` | | Project name |
| `targetUrl` | `String` | | Target URL to monitor |
| `ownerId` | `String` | | Foreign key to `User.id` |
| `createdAt` | `DateTime` | `@default(now())` | Project creation timestamp |
| `updatedAt` | `DateTime` | `@updatedAt` | Project update timestamp |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn** / **pnpm**
- **PostgreSQL** instance (or a **Supabase** account)

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

# Supabase Credentials
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key

# Database Connection Strings (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"

# Authentication
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRY=15m
```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Sentinel
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Database Setup

1. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

2. Apply database migrations:
   ```bash
   npx prisma db push
   ```

---

## 🏃 Running the Application

### Development Mode (with Live Reloading)

```bash
npm run dev
```
The server will start at `http://localhost:3000`.

### Production Mode

1. Build the TypeScript code:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

---

## 🔌 API Documentation

### Base URL: `/api/v1`

### User Routes (`/api/v1/users`)

#### 1. Register User
- **Method**: `POST`
- **Endpoint**: `/api/v1/users`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "strongPassword123"
  }
  ```
- **Response** (`201 Created`):
  ```json
  {
    "success": true,
    "message": "User Created Successfully",
    "data": {
      "id": "uuid-v4-string",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-08-20T23:30:00.000Z"
    }
  }
  ```

#### 2. Login User
- **Method**: `POST`
- **Endpoint**: `/api/v1/users/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "strongPassword123"
  }
  ```
- **Response** (`201 Created` / `200 OK`):
  ```json
  {
    "success": true,
    "message": "Login Successful",
    "data": {
      "user": {
        "id": "uuid-v4-string",
        "name": "John Doe",
        "email": "john@example.com",
        "createdAt": "2026-08-20T23:30:00.000Z"
      },
      "accessToken": "eyJhbGciOiJIUzI1NiIsIn..."
    }
  }
  ```

#### 3. Get User Profile
- **Method**: `GET`
- **Endpoint**: `/api/v1/users/me`
- **Access**: Private (Requires Authentication)
- **Headers**:
  ```text
  Authorization: Bearer <accessToken>
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "data": {
      "id": "uuid-v4-string",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-08-20T23:30:00.000Z"
    }
  }
  ```

---

## 🔒 Security Features

1. **Argon2 Hashing**: Passwords are securely hashed before persisting to the database.
2. **JWT Authentication Middleware**: Verifies incoming `Bearer` tokens in HTTP authorization headers.
3. **Role Validation Middleware (`requireRole`)**: Middleware for restricting access based on user roles (`USER`, `ADMIN`, `DEVELOPER`).
4. **Zod Validation**: Validates user inputs (email format, minimum password length, trimmed fields) to guard against invalid or malicious data payloads.

---

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the server in development mode with `tsx watch` |
| `npm run build` | Compiles TypeScript source files into JavaScript |
| `npm run start` | Executes the compiled production code from `dist/` |

---

Made with ❤️ for Sentinel.
