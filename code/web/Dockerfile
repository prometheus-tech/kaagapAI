# PHASE 1: Build
# This is an alternative to build using Jenkins, and I don't really like this approach
# due to the number of images generated. But it is a easy way to implement the build process,
# so I'll keep it this way until I got enough time and knowledge about Jenkins to implement 
# a proper and scalable build process.
FROM node:alpine AS builder

WORKDIR /app

# Before adding the codebase to the image, we install dependencies. 
# This way, we can optimize the build process, using docker's cache system
COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .
RUN npm run build

# PHASE 2: Serve artifact from build phase with nginx
FROM nginx:alpine
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
