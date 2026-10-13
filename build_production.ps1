# =======================================================
# CareerCompass AI - PowerShell Production Build Pipeline
# =======================================================

$ErrorActionPreference = "Stop"

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  CareerCompass AI - Production Build Pipeline" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""

$RootPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# 1. Resolve Java 21
if (-not $env:JAVA_HOME) {
    if (Test-Path "C:\Program Files\Java\jdk-21.0.11") {
        $env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.11"
    } else {
        Write-Error "JAVA_HOME is not set and default JDK 21 directory was not found. Please set JAVA_HOME."
    }
}
Write-Host "[1/4] Using JAVA_HOME: $env:JAVA_HOME" -ForegroundColor Green

# 2. Build Frontend
Write-Host "`n[2/4] Building React 19 Frontend with Vite..." -ForegroundColor Yellow
Set-Location "$RootPath\frontend"
& npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Frontend build failed with exit code $LASTEXITCODE"
}

# 3. Copy static assets to backend
Write-Host "`n[3/4] Embedding Frontend static assets into Spring Boot..." -ForegroundColor Yellow
$StaticDir = "$RootPath\backend\src\main\resources\static"
if (-not (Test-Path $StaticDir)) {
    New-Item -ItemType Directory -Path $StaticDir -Force | Out-Null
}
Copy-Item -Path "$RootPath\frontend\dist\*" -Destination $StaticDir -Recurse -Force

# 4. Package Spring Boot JAR
Write-Host "`n[4/4] Packaging Spring Boot Single-JAR..." -ForegroundColor Yellow
Set-Location "$RootPath\backend"
& ".\mvnw.cmd" clean package -DskipTests
if ($LASTEXITCODE -ne 0) {
    Write-Error "Backend packaging failed with exit code $LASTEXITCODE"
}

# 5. Copy to root deployable
Set-Location $RootPath
Copy-Item -Path "$RootPath\backend\target\careercompass-backend-1.0.0.jar" -Destination "$RootPath\careercompass-ai.jar" -Force

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host "  SUCCESS! Production Build Completed Successfully!" -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "Deployable Artifact: $RootPath\careercompass-ai.jar" -ForegroundColor White
Write-Host "To start the production server, run: .\start_production.ps1`n" -ForegroundColor Yellow
