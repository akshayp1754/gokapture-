# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the app's source code into the container
COPY . .

# Expose port 5000 for the app
EXPOSE 5000

# Command to run the app
CMD ["npm", "start"]
