# User Management API Documentation

## 📋 Project Overview

A RESTful API for managing users built with Node.js and Express that supports full CRUD operations with proper validation, error handling, and logging.

**Repository:** https://github.com/JKS-sys/user-management-api-at-0001  
**Live Deployment:** https://user-management-api-at-0001.vercel.app/

## 🚀 Features

- ✅ Complete CRUD operations for users
- ✅ Request logging middleware
- ✅ Input validation for POST/PUT requests
- ✅ Proper HTTP status codes and error handling
- ✅ In-memory data storage
- ✅ Deployed on Vercel

## 📊 API Endpoints

| Method | Endpoint     | Description       | Status Codes  |
| ------ | ------------ | ----------------- | ------------- |
| GET    | `/`          | API health check  | 200           |
| GET    | `/users`     | Get all users     | 200           |
| GET    | `/users/:id` | Get user by ID    | 200, 404      |
| POST   | `/user`      | Create new user   | 201, 400      |
| PUT    | `/user/:id`  | Update user by ID | 200, 400, 404 |
| DELETE | `/user/:id`  | Delete user by ID | 200, 404      |

## 🧪 Test Results

### 1. Health Check Endpoint

**GET /** - Verify API is running
![Health Check](screenshots/GET/User%20Management%20API%20is%20running!.png)

**Response:**

```json
{
  "message": "User Management API is running!",
  "endpoints": {
    "GET /users": "Get all users",
    "GET /users/:id": "Get user by ID",
    "POST /users": "Create a new user",
    "PUT /users/:id": "Update user by ID",
    "DELETE /users/:id": "Delete user by ID"
  }
}
```

### 2. Get All Users

**GET /users** - Retrieve all users
![Get All Users](screenshots/GET/Get%20all%20users.png)

**Response (200 OK):**

```json
{
  "message": "Users retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "firstName": "Anshika",
      "lastName": "Agarwal",
      "hobby": "Teaching"
    },
    {
      "id": 2,
      "firstName": "John",
      "lastName": "Doe",
      "hobbys": "reading"
    },
    {
      "id": 3,
      "firstName": "Jane",
      "lastName": "Smith",
      "hobbys": "cooking"
    }
  ]
}
```

### 3. Get User by ID (Success)

**GET /users/3** - Get specific user
![Get User by ID](screenshots/GET/Get%20user%20by%20ID.png)

**Response (200 OK):**

```json
{
  "message": "User retrieved successfully",
  "data": {
    "id": 3,
    "firstName": "Jane",
    "lastName": "Smith",
    "hobbys": "cooking"
  }
}
```

### 4. Get User by ID (Not Found)

**GET /users/4** - User doesn't exist
![Get User Not Found](screenshots/GET/User%20with%20ID%204%20not%20found.png)

**Response (404 Not Found):**

```json
{
  "error": "User not found",
  "message": "User with ID 4 does not exist"
}
```

### 5. Create New User (Success)

**POST /users** - Create a new user
![Create User Success](screenshots/POST/Create%20a%20new%20user.png)

**Request Body:**

```json
{
  "firstName": "Antony",
  "lastName": "Bill",
  "hobbys": "cooking"
}
```

**Response (201 Created):**

```json
{
  "message": "User created successfully",
  "data": {
    "id": 4,
    "firstName": "Antony",
    "lastName": "Bill",
    "hobbys": "cooking"
  }
}
```

### 6. Create User (Validation Error)

**POST /users** - Missing required fields
![Create User Validation Error](screenshots/POST/Validation%20failed.png)

**Request Body (invalid):**

```json
{
  "firstName": "Antony",
  "lastName": "Bill"
}
```

**Response (400 Bad Request):**

```json
{
  "error": "Validation failed",
  "message": "First name, last name, and hobbys are required."
}
```

### 7. Update User (Success)

**PUT /users/1** - Update existing user
![Update User Success](screenshots/PUT/Update%20user%20by%20ID.png)

**Request Body:**

```json
{
  "firstName": "Anshika",
  "lastName": "Agarwal",
  "hobby": "Coding"
}
```

**Response (200 OK):**

```json
{
  "message": "User updated successfully",
  "data": {
    "id": "1",
    "firstName": "Anshika",
    "lastName": "Agarwal",
    "hobby": "Coding"
  }
}
```

### 8. Update User (Not Found)

**PUT /users/5** - User doesn't exist
![Update User Not Found](screenshots/PUT/User with ID 5 not found.png)

**Response (404 Not Found):**

```json
{
  "error": "User not found",
  "message": "User with ID 5 does not exist"
}
```

### 9. Update User (Validation Error)

**PUT /users/1** - No fields provided
![Update User Validation Error](screenshots/PUT/No fields provided.png)

**Request Body (invalid):**

```json
{}
```

**Response (400 Bad Request):**

```json
{
  "error": "Validation failed",
  "message": "At least one of first name, last name, or hobbys must be provided."
}
```

### 10. Delete User (Success)

**DELETE /users/2** - Delete user by ID
![Delete User Success](screenshots/DELETE/Delete%20user%20by%20ID.png)

**Response (200 OK):**

```json
{
  "message": "User deleted successfully",
  "data": {
    "id": "2",
    "firstName": "John",
    "lastName": "Doe",
    "hobby": "Reading"
  }
}
```

### 11. Delete User (Not Found)

**DELETE /user/5** - User doesn't exist
![Delete User Not Found](screenshots/DELETE/User%20with%20ID%205%20not%20found.png)

**Response (404 Not Found):**

```json
{
  "error": "User not found",
  "message": "User with ID 5 does not exist"
}
```

## 🔧 Technical Implementation

### Middleware Features

- **Request Logging**: Logs method, URL, status code, and response time
- **Input Validation**: Comprehensive validation for POST/PUT requests
- **Error Handling**: Proper HTTP status codes and meaningful error messages

### Validation Rules

**POST /user:**

- All fields (firstName, lastName, hobby) are required
- Fields must be non-empty strings
- Automatic whitespace trimming

**PUT /user/:id:**

- At least one field must be provided
- Provided fields must be valid non-empty strings

### Data Structure

```javascript
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "hobby": "string"
}
```

## ✅ Testing Coverage

The 11 screenshots demonstrate comprehensive testing of:

- ✅ All HTTP methods (GET, POST, PUT, DELETE)
- ✅ Success scenarios (200, 201 status codes)
- ✅ Error scenarios (400, 404 status codes)
- ✅ Validation middleware functionality
- ✅ Edge cases (missing data, invalid IDs)

## 🎯 Assignment Requirements Fulfilled

| Requirement           | Status | Evidence                          |
| --------------------- | ------ | --------------------------------- |
| Node.js project setup | ✅     | package.json, dependencies        |
| REST API routes       | ✅     | All 5 endpoints implemented       |
| Middleware logging    | ✅     | Request logging implemented       |
| Validation middleware | ✅     | Comprehensive input validation    |
| Error handling        | ✅     | Proper status codes & messages    |
| In-memory data        | ✅     | Array-based storage               |
| Code comments         | ✅     | Well-documented code              |
| API testing           | ✅     | 13 comprehensive test screenshots |

## 📝 Conclusion

The API successfully meets all assignment requirements with robust functionality, proper error handling, and comprehensive testing. The deployment on Vercel ensures the API is accessible and functional in a production environment.
