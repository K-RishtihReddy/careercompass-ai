# 🚀 CareerCompass AI – Production Deployment Guide

CareerCompass AI is fully configured for production deployment across multiple environments. Choose the deployment model that best fits your infrastructure:

| Mode | Best For | Prerequisites | Access URL |
| :--- | :--- | :--- | :--- |
| **Mode 1: Single-JAR All-In-One** *(Recommended)* | Local production, College demo, Standalone VM / VPS | Java 21 & MySQL | `http://localhost:8080` |
| **Mode 2: Docker Compose** | Microservice & containerized hosting, Linux servers | Docker & Docker Compose | `http://localhost:80` |
| **Mode 3: Split-Process Production** | Separate frontend/backend hosting | Node.js 18+ & Java 21 & MySQL | UI: `http://localhost:4173`<br>API: `http://localhost:8080` |
| **Mode 4: Cloud PaaS (Render / Railway / Vercel)** | Zero-infrastructure 24/7 cloud deployment | GitHub repository | Custom Cloud Domain |

---

## ⚡ Mode 1: Single-JAR All-In-One Deployment (Recommended)

In this mode, the compiled React 19 production bundle is embedded directly inside Spring Boot's static resource directory. A single executable JAR serves both the rich frontend UI and all REST APIs on port **8080** with zero CORS configuration required.

### 1. Pre-requisites
- **Java 21 JDK / JRE** installed
- **MySQL 8.0** running locally on port `3306` with database `careercompass_db` initialized (see `database/schema.sql` and `database/seed_data.sql`).

### 2. Immediate Start (Pre-built Artifact)
The deployable fat JAR has already been packaged in the project root:
- **Windows (Double-click or CMD)**:
  ```cmd
  start_production.bat
  ```
- **PowerShell**:
  ```powershell
  .\start_production.ps1
  ```
- **Direct Java Command**:
  ```cmd
  java -jar careercompass-ai.jar
  ```
The application will automatically boot and open `http://localhost:8080` in your browser.

### 3. Rebuilding the Production Package
If you modify frontend code or backend Java classes, rebuild the all-in-one package with:
- **Windows**:
  ```cmd
  build_production.bat
  ```
- **PowerShell**:
  ```powershell
  .\build_production.ps1
  ```
This pipeline automatically executes:
1. `npm run build` in `frontend/`
2. Copies `frontend/dist/` into `backend/src/main/resources/static/`
3. Runs `mvnw clean package -DskipTests`
4. Produces the updated `careercompass-ai.jar` in the root folder.

---

## 🐳 Mode 2: Docker & Docker Compose Deployment

The project includes production Dockerfiles and a `docker-compose.yml` orchestrating **MySQL 8.0**, the **Java 21 Backend**, and the **Nginx-powered Frontend**.

### Architecture:
- `careercompass-mysql`: MySQL 8.0 container initialized automatically with `database/init.sql`.
- `careercompass-backend`: Multi-stage Eclipse Temurin Java 21 container.
- `careercompass-frontend`: Multi-stage Node build + Nginx Alpine reverse proxying `/api` requests to the backend.

### 1. Launch Containers
From the root project directory:
```bash
docker compose up --build -d
```

### 2. Verify Container Health
```bash
docker compose ps
```
- Frontend UI: `http://localhost` (or `http://localhost:80`)
- Backend REST API: `http://localhost:8080/api`
- Backend Health Check: `http://localhost:8080/api/health`

### 3. Stop Containers
```bash
docker compose down
# Or to wipe database volumes as well:
docker compose down -v
```

---

## 🔄 Mode 3: Split-Process Production Deployment

For environments where the frontend static server runs separately from the Java backend process:

### 1. Start Spring Boot Backend:
```powershell
cd backend
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.11"
& ".\mvnw.cmd" spring-boot:run
```
Backend will listen on `http://localhost:8080`.

### 2. Start Frontend Preview Server:
In another terminal:
```cmd
start_frontend_preview.bat
```
or:
```bash
cd frontend
npm run build
npm run preview
```
Frontend will listen on `http://localhost:4173` and automatically proxy all `/api` calls to `http://localhost:8080`.

---

## ☁️ Mode 4: Cloud Deployment (Render, Railway, Vercel)

### Option A: Render (1-Click Blueprint)
The project includes a ready-to-deploy [`render.yaml`](file:///e:/Project-TT/careercompass-ai/render.yaml) blueprint:
1. Push this repository to GitHub.
2. Log into [Render.com](https://render.com).
3. Click **New +** -> **Blueprint**.
4. Connect your GitHub repository.
5. Render reads `render.yaml` and automatically provisions:
   - Managed MySQL Database
   - Dockerized Spring Boot Web Service
   - React Static Site with automatic rewrite rules

### Option B: Vercel (Frontend) + Render / Railway (Backend)
1. **Frontend on Vercel**:
   - Push `frontend/` to GitHub or import root.
   - Vercel automatically detects Vite via [`frontend/vercel.json`](file:///e:/Project-TT/careercompass-ai/frontend/vercel.json).
   - Set Environment Variable in Vercel Project Settings:
     ```env
     VITE_API_BASE_URL=https://your-backend-api.onrender.com/api
     ```
2. **Backend on Render / Railway**:
   - Create Docker Web Service pointing to `backend/Dockerfile`.
   - Set environment variables (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`).

---

## ⚙️ Environment Variables Reference

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `SERVER_PORT` | `8080` | Backend HTTP listening port |
| `DB_HOST` | `localhost` (or `mysql` in Docker) | MySQL database hostname |
| `DB_PORT` | `3306` | MySQL port |
| `DB_NAME` | `careercompass_db` | MySQL database schema name |
| `DB_USERNAME` | `root` | Database username |
| `DB_PASSWORD` | `12345` | Database password |
| `JWT_SECRET` | `404E6352...` | 256-bit secret key for signing auth tokens |
| `JWT_EXPIRATION_MS` | `86400000` (24 hours) | Token validity in milliseconds |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,http://localhost:3000` | Allowed CORS origins (comma-separated) |
| `VITE_API_BASE_URL` | *Auto-detected* | Custom frontend API URL (optional) |

---

## 🛡️ Default Demo & Admin Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@careercompass.ai` | `Admin@123` |
| **Demo User** | `alex.chen@example.com` | `User@123` |
| **Registration** | Any valid email | Minimum 6 characters |
