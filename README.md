# Blog API (Node.js + Express + MongoDB)

## Tech Stack
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication

## Architecture
Controller → Service → Repository

## Endpoints

### Auth
POST /auth/register — register
POST /auth/login — login

### Posts
GET /posts — get all posts
GET /posts/:id — get post by id
POST /posts — create post (auth required)
PATCH /posts/:id — update post (auth required)
DELETE /posts/:id — delete post (auth + admin required)

### Categories
GET /categories — get all categories
GET /categories/:id/posts — get posts by category
POST /categories — create category
DELETE /categories/:id — delete category

## Installation
1. Clone the repository
2. npm install
3. Create .env file
4. npm run dev