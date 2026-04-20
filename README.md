# Blog API

A robust, RESTful backend API for a simple blog application built with Node.js, Express, and TypeScript. 

## 🚀 Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcryptjs (Password Hashing)
- **Data Storage:** In-memory Collections (Development Only)

## 📦 Prerequisites

Make sure you have Node.js and NPM installed on your machine.
- Node.js (v16+ recommended)
- NPM

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root of your project and include the following:
   ```env
   PORT=3000
   JWT_SECRET=your_super_secret_key_here
   ```

3. **Run the Development Server:**
   This command starts the server using `nodemon` and `ts-node` for live-reloading.
   ```bash
   npm run start
   ```
   > The server will typically be available at `http://localhost:3000`.

4. **Build for Production:**
   ```bash
   npm run build
   ```

## 🔐 Authentication

Most data-modifying operations (creating posts, editing, deleting code) require a valid JSON Web Token. 
1. Call `POST /auth/signup` or `POST /auth/login` with an email and password.
2. Receive your `token` in the response.
3. Pass this token in the header of your subsequent requests:
   ```
   Authorization: Bearer <your_token>
   ```

## 🛣️ API Endpoints

### Auth
- `POST /auth/signup` - Register a new user account.
- `POST /auth/login` - Authenticate an existing user and return a JWT.

### Users
- `GET /users` - Retrieve a list of all users.
- `GET /users/:userId` - Retrieve a specific user by their ID.
- `PUT /users/:userId` 🔒 - Update a user's profile (requires authentication).

### Posts
- `GET /posts` - Retrieve all blog posts.
- `GET /posts/:postId` - Retrieve a specific blog post by ID.
- `POST /posts` 🔒 - Create a new blog post.
- `PUT /posts/:postId` 🔒 - Edit an existing blog post (must be the author).
- `DELETE /posts/:postId` 🔒 - Delete a blog post (must be the author).

### Comments
- `GET /posts/:postId/comments` - Retrieve all comments for a given post.
- `GET /posts/:postId/comments/:commentId` - Retrieve a specific comment by ID.
- `POST /posts/:postId/comments` 🔒 - Add a comment to a post.
- `PUT /posts/:postId/comments/:commentId` 🔒 - Edit an existing comment.
- `DELETE /posts/:postId/comments/:commentId` 🔒 - Delete a comment (must be the comment author or post author).

> **Note**: Endpoints marked with 🔒 require the `Authorization` header.

## 📝 Future Roadmap

- [ ] Connect a persistent database (PostgreSQL, MongoDB, or fully local SQLite).
- [ ] Centralized error handling wrapper for Express routes.
- [ ] Pagination parameters to `GET /posts` and `GET /users` endpoints.

---
