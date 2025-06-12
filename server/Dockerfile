# Use official lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only the dependency files first (leverage Docker caching)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (Render uses this to bind the service)
EXPOSE 5000

# Start the server
CMD ["node", "app.js"]
