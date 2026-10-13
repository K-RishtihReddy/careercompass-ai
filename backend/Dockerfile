# ==========================================
# CareerCompass AI - Backend Dockerfile
# Multi-stage build with Eclipse Temurin JDK 21
# ==========================================

# Stage 1: Build stage
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app

# Install dos2unix to ensure line endings are clean
RUN apk add --no-cache dos2unix

# Copy Maven wrapper & pom.xml
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN dos2unix mvnw && chmod +x mvnw

# Pre-fetch dependencies (cached layer)
RUN ./mvnw dependency:go-offline -B || true

# Copy source code & resources
COPY src ./src

# Build production JAR (skipping test execution for faster image builds)
RUN ./mvnw clean package -DskipTests -B

# Stage 2: Minimal Runtime container
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Add dedicated non-root application user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy compiled JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Change ownership to appuser
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8080

# Production JVM optimizations for container environments
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
