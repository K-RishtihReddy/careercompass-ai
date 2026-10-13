@echo off
echo =======================================================
echo   CareerCompass AI - Frontend Production Preview
echo   Serving optimized React build on http://localhost:4173
echo =======================================================
echo.

cd /d "%~dp0frontend"
if not exist "dist" (
    echo Building frontend first...
    call npm run build
)

echo Starting Vite preview server with API reverse proxy to port 8080...
npm run preview
pause
