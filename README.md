# Project Title: React and Flask Token Authentication with Profile

## Overview

This project demonstrates a web application with user authentication implemented using React for the frontend and Flask for the backend. Token-based authentication is achieved using Flask-JWT-Extended, and user data is stored in a SQLAlchemy database.

## Setup

### Backend (Flask)

1. Create a virtual environment:

    ```bash
    py -3 -m venv venv
    ```

2. Activate the virtual environment:

    ```bash
    venv\Scripts\activate
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Run the Flask application:

    ```bash
    flask run
    ```

### Frontend (React)

1. Create a React app:

    ```bash
    npx create-react-app myreactdev
    ```

2. Install React Router Dom:

    ```bash
    npm install react-router-dom --save
    ```

3. Install Axios:

    ```bash
    npm install axios --save
    ```

4. Run the React app:

    ```bash
    cd myreactdev
    npm start
    ```

## Backend Structure

- **app.py**: Flask application with routes for login, signup, profile retrieval, and logout.

- **models.py**: SQLAlchemy models for user data.

## Frontend Structure

- **App.js**: Main React component with routing logic, including login, header, profile, register, and reset password components.

- **Login.js**: Component handling user login with Axios for API requests.

- **Header.js**: Header component for navigation and logout functionality.

- **useToken.js**: Custom hook for handling authentication token.

- **Profile.js**: Component for displaying user profile information.

- **Register.js**: Component for user registration.

- **ResetPassword.js**: Component for resetting user password.

## API Endpoints

- **/logintoken (POST)**: User login endpoint, returns an access token.

- **/signup (POST)**: User registration endpoint.

- **/profile/<getemail> (GET)**: Retrieves user profile data. Requires a valid access token.

- **/logout (POST)**: Logs the user out by unsetting the JWT cookies.

## Usage

1. Run the Flask backend.

2. Run the React frontend.

3. Access the application at [http://localhost:3000](http://localhost:3000).

4. Use the provided Postman examples for testing login, signup, profile retrieval, and logout.

## Postman Examples

### Login

- **POST**: [http://127.0.0.1:5000/logintoken](http://127.0.0.1:5000/logintoken)
- Body (JSON):
  ```json
  {
    "email": "unlimiteddemi@gmail.com",
    "password": "your_password"
  }
  ```

### Signup

- **POST**: [http://127.0.0.1:5000/signup](http://127.0.0.1:5000/signup)
- Body (JSON):
  ```json
  {
    "email": "unlimiteddemi@gmail.com",
    "password": "your_password"
  }
  ```

### Profile

- **GET**: [http://127.0.0.1:5000/profile/unlimiteddemi@gmail.com](http://127.0.0.1:5000/profile/unlimiteddemi@gmail.com)
- Headers:
  - Key: Authorization
  - Value: Bearer <your_access_token>

### Logout

- **POST**: [http://127.0.0.1:5000/logout](http://127.0.0.1:5000/logout)

## Dependencies

- Flask
- Flask-JWT-Extended
- Flask-Bcrypt
- Flask-SQLAlchemy
- Flask-Cors
- React
- React Router Dom
- Axios

## Author

- Daniel Owen

For any inquiries, contact unlimiteddemi@gmail.com.

