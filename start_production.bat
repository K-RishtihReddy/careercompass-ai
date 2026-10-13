@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo   CareerCompass AI - Starting Production Server
echo =======================================================
echo.

:: Detect Java 21
if "%JAVA_HOME%"=="" (
    if exist "C:\Program Files\Java\jdk-21.0.11" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-21.0.11"
    )
)

if not "%JAVA_HOME%"=="" (
    set "PATH=%JAVA_HOME%\bin;%PATH%"
)

where java >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Java runtime not found.
    echo Please install Java 21 or set JAVA_HOME.
    pause
    exit /b 1
)

:: Locate JAR
set "JAR_FILE=%~dp0careercompass-ai.jar"
if not exist "%JAR_FILE%" (
    set "JAR_FILE=%~dp0backend\target\careercompass-backend-1.0.0.jar"
)

if not exist "%JAR_FILE%" (
    echo [ERROR] Deployable JAR file not found.
    echo Please run build_production.bat first to build the application.
    pause
    exit /b 1
)

echo Platform: Single-JAR All-In-One (React SPA + Spring Boot APIs)
echo Target JAR: %JAR_FILE%
echo Server URL: http://localhost:8080
echo.
echo Launching CareerCompass AI...
echo (Press Ctrl+C to stop the server at any time)
echo.

:: Open default browser after 4 seconds
start "" powershell -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:8080'"

:: Execute Spring Boot JAR
java -jar "%JAR_FILE%"
pause
