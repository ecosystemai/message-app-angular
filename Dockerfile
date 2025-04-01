# Stage 1: Build the Angular app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# Stage 2: Serve with a static server (like nginx or http-server)
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the Angular build output
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Expose port
EXPOSE 80
