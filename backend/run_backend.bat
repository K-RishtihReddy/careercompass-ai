@echo off
set "JAVA_HOME=C:\Program Files\Java\jdk-21.0.11"
set "PATH=%JAVA_HOME%\bin;%PATH%"
echo Starting CareerCompass AI Spring Boot Backend on http://localhost:8080...
call mvnw.cmd spring-boot:run
