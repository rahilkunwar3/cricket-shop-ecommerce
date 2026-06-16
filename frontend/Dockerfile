FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (using install instead of ci)
RUN npm install --force

# Copy all source files
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Start dev server
CMD ["npm", "run", "dev"]