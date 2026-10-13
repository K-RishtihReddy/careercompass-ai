# =======================================================
# CareerCompass AI - PowerShell Production Server Launcher
# =======================================================

$ErrorActionPreference = "Stop"

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  CareerCompass AI - Starting Production Server" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

$RootPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# 1. Detect Java 21
if (-not $env:JAVA_HOME) {
    if (Test-Path "C:\Program Files\Java\jdk-21.0.11") {
        $env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.11"
    }
}

$JavaExe = if ($env:JAVA_HOME) { "$env:JAVA_HOME\bin\java.exe" } else { "java" }

# 2. Locate JAR
$JarFile = "$RootPath\careercompass-ai.jar"
if (-not (Test-Path $JarFile)) {
    $JarFile = "$RootPath\backend\target\careercompass-backend-1.0.0.jar"
}

if (-not (Test-Path $JarFile)) {
    Write-Error "Deployable JAR not found. Please run .\build_production.ps1 first."
}

Write-Host "Mode:       Single-JAR All-In-One (React Frontend + Spring Boot Backend)" -ForegroundColor Green
Write-Host "Target JAR: $JarFile" -ForegroundColor White
Write-Host "URL:        http://localhost:8080`n" -ForegroundColor Yellow

# Launch browser after 4s in background
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 4
    Start-Process "http://localhost:8080"
} | Out-Null

# Run Application
& $JavaExe -jar $JarFile
