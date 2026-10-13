# ==========================================
# CareerCompass AI - Frontend Dockerfile
# Multi-stage build: Node.js build + Nginx Alpine
# ==========================================

# Stage 1: Build static assets
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies first for better Docker layer caching
COPY package*.json ./
RUN npm ci

# Copy source code and build config
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Serve with lightweight Nginx Alpine
FROM nginx:alpine

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
