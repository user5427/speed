# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copy app files
COPY . .
# Remove .enc from .dockerignore
RUN sed -i '/.env/d' .dockerignore

# Copy the .enc file
COPY ["*.env", "."]
RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]