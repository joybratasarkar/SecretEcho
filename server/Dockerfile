# server/Dockerfile (Production)

FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy rest of the server files
COPY . .

EXPOSE 5000

CMD ["node", "app.js"]
