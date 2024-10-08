# Todo Backend App

This is a backend application built using Node.js, Express, Sequelize, PostgreSQL, and JWT authentication. It provides a RESTful API for managing tasks (todos) with features such as task creation, retrieval, updating, deletion, filtering, pagination, and user authentication.

## Features

- User registration and login with JWT authentication.
- CRUD operations for tasks (todos).
- Tasks are associated with individual users; each user can only manage their own tasks.
- Filtering tasks by status, priority, due date, and search term.
- Pagination of tasks.
- Protected routes using JWT tokens.

## Technologies

- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL (Database)
- JWT for Authentication
- Docker & Docker Compose

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v12.x or later)
- Docker & Docker Compose (to run the PostgreSQL container)
- Postman (for API testing)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/akshayp1754/gokapture-.git
cd server
npm run start

Install dependencies:
npm install

Initialize PostgreSQL with Docker:
Use Docker Compose to spin up PostgreSQL and Adminer:

sudo docker compose up -d

Docker Setup
To run the PostgreSQL and Adminer services using Docker, use the following steps:

Ensure Docker and Docker Compose are installed on your system.
Run the following command to start the containers:
sudo docker compose up -d

This will set up PostgreSQL on port 5432 and Adminer on port 8080 as per the configurations in the docker-compose.yml file.

Once the services are up, you can access Adminer to view your database at:
http://localhost:8080


