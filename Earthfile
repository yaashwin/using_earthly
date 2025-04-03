# VERSION 0.7

# # Base dependencies target
# deps:
#     FROM node:18-alpine
#     WORKDIR /app

# # Build target for compiling the React application
# build:
#     FROM +deps
    
#     # Copy package.json and package-lock.json files
#     COPY package*.json ./
    
#     # Install dependencies
#     RUN npm ci
    
#     # Copy the rest of the application code
#     COPY . .
    
#     # Show available npm scripts
#     RUN npm run
    
#     # Build the React application (not "dev" which starts a server)
#     RUN npm run build
    
#     # Save artifacts with the correct path
#     SAVE ARTIFACT dist /dist
#     SAVE ARTIFACT node_modules /node_modules
#     SAVE ARTIFACT package.json /package.json

# # Production image target
# image:
#     FROM nginx:alpine
    
#     # Copy the built application from the build target
#     COPY +build/dist /usr/share/nginx/html
    
#     # Expose port 80
#     EXPOSE 80
    
#     # Save the image with your specified name
#     SAVE IMAGE earthly_image:latest

# push:
#     # Reference the image built in the image target
#     FROM +image
    
#     # Set Docker Hub credentials and repository info
#     ARG DOCKERHUB_USERNAME="yaashwin06"
#     ARG DOCKERHUB_TOKEN =""
    
#     # Login to Docker Hub using PAT
#     RUN echo "${DOCKERHUB_TOKEN}" | docker login -u "${DOCKERHUB_USERNAME}" --password-stdin
    
#     # Tag the image for Docker Hub
#     RUN docker tag earthly_image:latest ${DOCKERHUB_USERNAME}/earthly_image:latest
    
#     # Push the image to Docker Hub
#     RUN docker push ${DOCKERHUB_USERNAME}/earthly_image:latest
    
#     # Save the final image reference
#     SAVE IMAGE ${DOCKERHUB_USERNAME}/earthly_image:latest
VERSION 0.8
build:
    FROM node:18
    WORKDIR /app
    # Copy package.json and install dependencies
    COPY package.json ./
    RUN npm install
    # Copy source code and build the app
    COPY . .
    RUN npm run build
    # Save artifacts for other targets to use
    SAVE ARTIFACT /app /app
docker:
    FROM node:18
    WORKDIR /app
    # Copy built files from the build target
    COPY +build/app /app
    # Expose port and define entrypoint
    EXPOSE 3000
    CMD ["node", "server.js"]
    # Save the image
    SAVE IMAGE --push yaashwin06/earthly_image:latest
