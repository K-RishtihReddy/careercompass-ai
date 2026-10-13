# 🚀 Deploying CareerCompass AI to Vercel (Frontend) & Railway (Backend)

This step-by-step guide shows you how to deploy the **Spring Boot 3 + MySQL Backend** to **Railway** and the **React 19 + Vite Frontend** to **Vercel** with full zero-CORS integration.

---

## 📑 Overview Architecture

```
┌─────────────────────────────────┐           ┌──────────────────────────────────────┐
│       Vercel (Frontend)         │           │        Railway (Backend API)         │
│   https://<app>.vercel.app      │  REST API │   https://<app>.up.railway.app/api   │
│   React 19 + Vite SPA           ├──────────►│   Spring Boot 3.3.4 (Java 21)        │
└─────────────────────────────────┘  (Axios)  └──────────────────┬───────────────────┘
                                                                 │ JDBC
                                                                 ▼
                                                      ┌──────────────────────┐
                                                      │    Railway MySQL     │
                                                      │  careercompass_db    │
                                                      └──────────────────────┘
```

---

## Part 1: Deploy Backend & Database on Railway

### 1.1 Provision MySQL Database
1. Go to [railway.app](https://railway.app/) and sign in with GitHub.
2. Click **+ New Project** -> **Provision MySQL**.
3. Once the database card appears:
   - Click on the **MySQL** card.
   - Go to the **Variables** tab to see your credentials (`MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`).
   - Go to the **Data** or **Query** tab, or use a tool like TablePlus / DBeaver with the **Connect** connection string to run:
     👉 [`database/init.sql`](database/init.sql) (This creates tables and seeds the 41 skills, 12 jobs, and roadmaps).

### 1.2 Deploy Spring Boot Backend Service
1. In the same Railway Project, click **+ New** (or top-right **Create**).
2. Select **GitHub Repo** -> select `K-RishtihReddy/careercompass-ai`.
3. Click on the new service card:
   - Go to **Settings**:
     - Railway will automatically detect [`railway.json`](railway.json) and build using `backend/Dockerfile`.
     - Under **Networking**, click **Generate Domain** (e.g., `careercompass-production.up.railway.app`).
   - Go to **Variables** tab:
     Add the following environment variables (you can use Railway's **Add Reference** to automatically pull values from your MySQL service):
     | Variable Name | Value / Reference |
     | :--- | :--- |
     | `MYSQLHOST` | `${{MySQL.MYSQLHOST}}` *(or paste host)* |
     | `MYSQLPORT` | `${{MySQL.MYSQLPORT}}` *(or `3306`)* |
     | `MYSQLDATABASE` | `${{MySQL.MYSQLDATABASE}}` *(or `railway`)* |
     | `MYSQLUSER` | `${{MySQL.MYSQLUSER}}` *(or `root`)* |
     | `MYSQLPASSWORD` | `${{MySQL.MYSQLPASSWORD}}` *(or your DB password)* |
     | `JWT_SECRET` | `404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970` |
     | `CORS_ALLOWED_ORIGINS` | `*` |

4. Railway will automatically build and deploy.
5. **Verify Backend Health**:
   Open in your browser:
   `https://<your-railway-domain>/api/health`
   You should see:
   ```json
   {"success":true,"message":"CareerCompass AI API is up and running smoothly","data":{"version":"1.0.0","status":"UP"}}
   ```

---

## Part 2: Deploy Frontend on Vercel

### 2.1 Import Repository into Vercel
1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
2. Click **Add New...** -> **Project**.
3. Find and click **Import** next to `K-RishtihReddy/careercompass-ai`.

### 2.2 Configure Project Settings
In the Vercel project configuration screen:
1. **Framework Preset**: Ensure `Vite` is selected.
2. **Root Directory**:
   - Click **Edit** next to Root Directory.
   - Select `frontend` folder and click **Continue**.
3. **Environment Variables**:
   Expand the Environment Variables section and add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://<YOUR-RAILWAY-DOMAIN>/api`
     *(Example: `https://careercompass-production.up.railway.app/api` — make sure to append `/api` at the end and do not put a trailing slash!)*

4. Click **Deploy**!

---

## Part 3: Verify the Live Deployment

1. Once Vercel finishes building (usually ~30 seconds), click the **Visit** link to open your live production site:
   `https://<your-project-name>.vercel.app`
2. **Test End-to-End**:
   - **Sign In** as Administrator:
     - **Email**: `admin@careercompass.ai`
     - **Password**: `Admin@123`
   - **Sign In** as Demo User:
     - **Email**: `alex.chen@example.com`
     - **Password**: `User@123`
   - **Take Assessment**: Answer the questions and verify that AI Recommendations, Match Percentages, and Skill Gap radar charts load from the Railway backend.
   - **Role-based Access**: Visit the **Admin Portal** to add/edit jobs or view platform metrics.
