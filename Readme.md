# SQL Data Management Application

This project is a **SQL Data Management Application** built using **Node.js** with **Express.js**, **MySQL**, and **EJS** templating for the front-end. The project allows CRUD (Create, Read, Update, Delete) operations for user records stored in a MySQL database. Faker.js is used to generate mock user data for testing purposes.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)

## Project Overview

This application provides a simple web interface for managing user data stored in a MySQL database. The application allows the following operations:
- Display a list of users
- Add new user records
- Edit existing user records
- View individual user details
- Delete user records

Mock data generation is done using the **Faker.js** library.

## Features

- **CRUD Functionality:** Full Create, Read, Update, Delete support for user data.
- **Mock Data Generation:** Generates mock user data using Faker.js.
- **Database Integration:** Uses MySQL for persistent data storage.
- **Templating Engine:** Utilizes EJS for rendering server-side HTML templates.
- **Routing and Middleware:** Express.js is used for routing and handling HTTP requests.

## Technologies Used

- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **MySQL**: Database for storing user data
- **EJS**: Templating engine for rendering HTML
- **Faker.js**: Library for generating fake data
- **Method-Override**: Middleware to support HTTP verbs like PUT and DELETE
- **UUID**: For generating unique identifiers

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Anshuman-Jha-01/RESTful-API-with-SQL.git
   ```

2. **Navigate into the project directory:**
   ```bash
   cd RESTful-API-with-SQL
   ```

3. **Install dependencies:**
   Ensure you have [Node.js](https://nodejs.org/) and [MySQL](https://www.mysql.com/) installed. Then run:
   ```bash
   npm install
   ```

4. **Set up MySQL:**
   Create a MySQL database named `Home`. You can do this by logging into MySQL and running:
   ```sql
   CREATE DATABASE Home;
   ```

5. **Configure MySQL:**
   In both `index.js` and `insertData.js`, update the MySQL password with your own password in the following snippet:
   ```js
   password: "your-password"
   ```

6. **Run the application:**
   Start the Node.js server:
   ```bash
   node index.js
   ```

7. **Insert mock data:**
   To populate the database with fake data, run:
   ```bash
   node insertData.js
   ```

8. **Access the application:**
   Open your browser and go to:
   ```
   http://localhost:8080
   ```

## Usage

- The homepage shows the total number of user records.
- Use the `/user` route to see all users in the database.
- Add a new user via the `/new` route.
- Edit a user by navigating to `/user/edit/:id`.
- Delete a user by navigating to `/user/delete/:id`.

### Routes

- **GET** `/`: Homepage displaying the number of users
- **GET** `/user`: Displays all users
- **POST** `/user`: Adds a new user
- **GET** `/user/:id`: Displays a specific user
- **PATCH** `/user/:id`: Edits user data
- **DELETE** `/user/:id`: Deletes a user

## Project Structure

```
/views         # EJS templates for rendering UI
/public        # Static files (CSS, JS, images)
index.js       # Main server file
insertData.js  # Script to populate database with mock data
package.json   # Project metadata and dependencies
```

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).