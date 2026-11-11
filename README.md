# Kind Food App

A modern food ordering and delivery web app built with React on the frontend and Express + MongoDB on the backend.

## Overview

Kind Food App is designed to provide a clean food shopping experience with:
- a landing page for food discovery
- about and contact pages
- cart management
- FAQ section
- user authentication using backend APIs
- MongoDB-powered data storage

## Tech Stack

- Frontend: React, React Router, Bootstrap, CSS
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Other: JWT/Auth, CORS, dotenv, cookie-parser

## Project Structure

```bash
Kind_Food_App/
├── public/
├── server/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .gitignore
│   ├── index.js
│   └── package.json
├── src/
│   ├── Components/
│   ├── Data/
│   ├── Pages/
│   ├── Redux/
│   ├── Services/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── .gitignore
├── .nvmrc
├── package.json
├── package-lock.json
├── README.md
└── server/package-lock.json
```

## Features

- Responsive food app UI
- Route-based navigation
- User signup/login APIs
- Cart creation, update, delete, and fetch operations
- Environment-based backend configuration
- Server-side MongoDB connection setup

## Prerequisites

Before running the project, make sure you have:
- Node.js 18+ or compatible version
- npm
- MongoDB running locally or a MongoDB connection URI

## Installation

1. Clone the repository:

```bash
git clone https://github.com/AnirudhSharma777/Kind_Food_App.git
cd Kind_Food_App
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd server
npm install
cd ..
```

## Environment Configuration

Create a `.env` file inside the `server` folder with the following values:

```env
PORT=5000
MONGODB=your_mongodb_connection_uri
```

If the frontend needs environment variables later, add them as needed in the app root.

## Running the App

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend app from the project root:

```bash
npm start
```

The frontend is typically served on:
- http://localhost:3000

The backend API runs on:
- http://localhost:5000

## API Endpoints

The Express backend includes authentication and cart routes:

- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/cart/createcart`
- `DELETE /api/v1/cart/deletecart`
- `PUT /api/v1/cart/updatecart`
- `GET /api/v1/cart/getcart`

## Notes

This project is a full-stack food ordering app template and can be extended with:
- product catalog management
- real checkout flow
- order tracking
- admin dashboard
- payment integration

## License

This project is currently unlicensed unless specified otherwise by the repository owner.

## Contributing

Pull requests and improvements are welcome. If you want to contribute, please fork the repo and submit a pull request with a clear description of your changes.
