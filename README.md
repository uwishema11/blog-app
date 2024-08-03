# Blog Application

A simple blog application that allows users to register, log in, create, edit, delete, and comment on blog posts. This project was developed as part of the QT Practical Test for Software Developers (Interns).

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Setup and Running the Project](#setup-and-running-the-project)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)
- [Project Components](#project-components)


## Overview

This project is a simple blog application that provides user authentication, blog post management, and comment management functionalities. Users can register, log in, create, edit, delete, and comment on blog posts.

## Technologies Used

- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Linting and Formatting:** ESLint, Prettier

## Features

### Backend

1. **User Authentication:**

   - Implemented user registration and login functionalities using JWT.
   - Secure password storage with bcrypt.

2. **Blog Post Management:**

   - Models for Post and Comment.
   - A Post includes a title, content, author, and timestamps.
   - A Comment is linked to a specific Post, with content, author, and timestamps.

3. **API Endpoints:**
   - CRUD operations for Post and Comment.
   - Authentication endpoints (register, login).

## Project Structure

```plaintext
.
├── src
│   ├── controllers      # Express controllers for handling requests
│   ├── database
│   │   ├── config       # Database configuration files
│   │   ├── migrations   # Database migration files
│   │   ├── models       # Sequelize models (User, Post, Comment)
│   │   └── seeders      # Sample data for testing
│   ├── middlewares      # Custom middleware (authentication, error handling)
│   ├── routes           # Express routes for API endpoints
│   ├── services         # Express services for API 
│   ├── utils            # Utility functions
│   ├── validations      # Validation schema for requests
│   ├── app.js           # Application file
│   └── index.js         # Main application file
├── .babel.config.ts     # Babel configuration to enable ES6 features
├── .eslintrc.json       # ESLint configuration
├── .gitignore           # Gitignore files
├── .prettierrc          # Prettier configuration
├── .sequelizerc         # Sequelize configuration
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

## Setup and Running the Project

### Prerequisites

- **Node.js** (v14 or higher)
- **PostgreSQL** (v12 or higher)

### Steps

1. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory and add the following environment variables:
plaintext
     NODE_ENV=development
     PORT=3000
     DEV_DATABASE_URL=postgres://username:password@localhost:5432/database_name
     PROD_DATABASE_URL=postgres://username:password@localhost:5432/database_name
     TEST_DATABASE_URL=postgres://username:password@localhost:5432/database_name
     JWT_SECRET=your_secret_key
     
2. **Initialize the Database:**
- Run `npx sequelize db:migrate` to create the database schema.
     
3. **Run Database Migrations and Seeders:**
   - Execute the following commands to run migrations and seeders:
bash
     npx sequelize-cli db:migrate
     npx sequelize-cli db:seed:all
     
4. **Start the Application:**
   - Start the application by running:
bash
     npm start
     
- The backend API will be running on [http://localhost:3000](http://localhost:3000).


## Linting and Formatting

- **ESLint:**
  
bash
  npm run lint
- **PRETTIER:**
bash
  npm run prettier --write

## Installation

Instructions for installing the project:

bash
git clone https://github.com/uwishema11/blog-app.git
cd blog-app
npm install

## Project Components

### Models

- **User:** 
  - Handles user data and authentication.

- **Post:** 
  - Represents blog posts with attributes like title, content, and author.

- **Comment:** 
  - Represents comments linked to specific posts.

### Controllers

- **AuthController:** 
  - Manages user registration and login.

- **PostController:** 
  - Manages CRUD operations for blog posts.

- **CommentController:** 
  - Manages CRUD operations for comments.

### Routes

- **Auth Routes:**
  - POST /api/auth/register: Register a new user.
  - POST /api/auth/login: Log in an existing user.

- **Post Routes:**
  - GET /api/blog: Retrieve a list of blog posts.
  - POST /api/blog/create: Create a new blog post.
  - GET /api/blog/:blogId: Retrieve a specific blog post by ID.
  - PUT /api/blog/:blogId: Update a specific blog post by ID.
  - DELETE /api/blog/:blogId: Delete a specific blog post by ID.

- **Comment Routes:**
  - POST /api/comments:/blogId: Add a comment to a post.
  - GET /api/comments/:id: Retrieve a specific comment by ID.
  - PUT /api/comments/:blogId/comments/:commentId Update a specific comment by ID.
  - DELETE /api/comments/:blogId/comments/:commentId: Delete a specific comment by ID.

### Middlewares

- **Auth Middleware:** 
  - Verifies JWT token for protected routes.
 

### Utilities

- **Helpers:** 
  - functions for tasks like password hashing and token generation.
- **utils:** 
  - Utility functions for Catching and handles errors centrally..

