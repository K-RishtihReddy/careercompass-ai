$ErrorActionPreference = "Stop"
$javaHome = "C:\Program Files\Java\jdk-21.0.11"
[Environment]::SetEnvironmentVariable('JAVA_HOME', $javaHome, 'Process')
$env:Path = "$javaHome\bin;$env:Path"

Write-Host "Starting CareerCompass AI Spring Boot Backend on http://localhost:8080..." -ForegroundColor Cyan
& ".\mvnw.cmd" spring-boot:run
