Express.js MyNetflix API
====================

This project is a movie API built with Express.js. It includes features such as user authentication, user management, movie lists, and movie management.

Features
--------

*   User authentication (JWT)
*   User management
*   Add, update, delete movies
*   Create and manage movie lists
*   File upload support (profile picture upload)

Installation
------------

### 1\. Clone the Repository

    git clone https://github.com/dxtaner/Nodejs-MyNetflix-App
    cd Nodejs-MyNetflix-App

### 2\. Install Dependencies

    npm install

### 3\. Configure Environment Variables

Create a `.env` file in the project root directory and add the following variables:

    PORT=8082
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

### 4\. Start the Server

    npm start

When the server starts successfully, you will see the following message:

    Backend server is running on port 8082!

Usage
-----

The API supports the following endpoints:

### User Authentication

*   `POST /api/auth/register` - Register a new user
*   `POST /api/auth/login` - User login

### User Management

*   `PATCH /api/users/:id` - Update user information
*   `DELETE /api/users/:id` - Delete a user
*   `GET /api/users/all` - Retrieve all users
*   `GET /api/users/:userId` - Retrieve a specific user
*   `GET /api/users/stats` - Get user statistics
*   `PATCH /api/users/profile-pic` - Update profile picture

### Movie Management

*   `GET /api/movies` - Retrieve all movies
*   `POST /api/movies` - Add a new movie
*   `GET /api/movies/random` - Retrieve a random movie
*   `GET /api/movies/:id` - Retrieve a specific movie
*   `PATCH /api/movies/:id` - Update a movie
*   `DELETE /api/movies/:id` - Delete a movie

### Movie Lists

*   `POST /api/lists` - Create a new list
*   `GET /api/lists` - Retrieve all lists
*   `GET /api/lists/:id` - Retrieve a specific list
*   `DELETE /api/lists/:id` - Delete a list

Dependencies
------------

*   `express` - Web server
*   `mongoose` - ODM for MongoDB
*   `dotenv` - Environment variable management
*   `multer` - File upload handling

Contributing
------------

If you would like to contribute to the project, please fork the repository, make your changes, and submit a pull request.

License
-------

This project is licensed under the MIT License.
