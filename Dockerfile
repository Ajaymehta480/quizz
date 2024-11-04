# Dockerfile
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to take advantage of Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["node", "dist/index.js"]

