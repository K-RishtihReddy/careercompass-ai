@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo   CareerCompass AI - Production Build Pipeline
echo =======================================================
echo.

:: Detect or set Java 21
if "%JAVA_HOME%"=="" (
    if exist "C:\Program Files\Java\jdk-21.0.11" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-21.0.11"
    ) else (
        echo [ERROR] JAVA_HOME is not set and default JDK 21 path was not found.
        echo Please set JAVA_HOME to your Java 21 JDK directory.
        pause
        exit /b 1
    )
)
echo [1/4] Using JAVA_HOME: %JAVA_HOME%

:: Step 2: Build React Frontend
echo.
echo [2/4] Building React 19 Frontend with Vite...
cd /d "%~dp0frontend"
call npm run build
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Frontend build failed.
    pause
    exit /b %ERRORLEVEL%
)

:: Step 3: Copy Frontend static assets to Spring Boot resources
echo.
echo [3/4] Embedding Frontend static assets into Spring Boot...
cd /d "%~dp0"
if not exist "backend\src\main\resources\static" mkdir "backend\src\main\resources\static"
xcopy /E /Y /I "frontend\dist\*" "backend\src\main\resources\static\" >nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Failed to copy frontend dist to backend static folder.
    pause
    exit /b %ERRORLEVEL%
)

:: Step 4: Package Spring Boot single-JAR
echo.
echo [4/4] Packaging Spring Boot Fat JAR (Single-JAR All-in-One)...
cd /d "%~dp0backend"
call mvnw.cmd clean package -DskipTests
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Maven packaging failed.
    pause
    exit /b %ERRORLEVEL%
)

cd /d "%~dp0"
copy /Y "backend\target\careercompass-backend-1.0.0.jar" "careercompass-ai.jar" >nul

echo.
echo =======================================================
echo   SUCCESS! Production Build Completed Successfully!
echo =======================================================
echo.
echo Output Deployable Artifact:
echo   %~dp0careercompass-ai.jar
echo.
echo You can run the entire platform with:
echo   start_production.bat
echo   or: java -jar careercompass-ai.jar
echo.
pause
