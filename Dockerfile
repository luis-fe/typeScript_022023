# Use the official Node.js 16.x image
FROM node:16.17.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli@14.2.13

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular project
RUN ng build --configuration=production

# Expose port 4200 to the outside world
EXPOSE 4200

# Start the Angular application
CMD ["npm", "start"]
