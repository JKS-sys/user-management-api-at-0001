const express = require("express");
const { validateUser, validateUserUpdate } = require("./middleware/validation");

// initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON requests
app.use(express.json());

// In-memory data store for users
let users = [
  {
    id: 1,
    firstName: "Anshika",
    lastName: "Agarwal",
    hobby: "Teaching",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    hobby: "reading",
  },
  {
    id: 3,
    firstName: "Jane",
    lastName: "Smith",
    hobby: "cooking",
  },
];

// Counter for generating enique IDs
let nextId = 4;

// Custom logging middleware
app.use((req, res, next) => {
  // store the start time
  const start = Date.now();

  // Log request details when response is finished
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });

  next();
});

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "User Management API is running!",
    endpointes: {
      "GET /users": "Get all users",
      "GET /users/:id": "Get user by ID",
      "POST /users": "Create a new user",
      "PUT /users/:id": "Update user by ID",
      "DELETE /users/:id": "Delete user by ID",
    },
  });
});

// Get all users
app.get("/users", (req, res) => {
  try {
    res.status(200).json({
      message: "Users retrieved successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

// Get user by ID

app.get("/users/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (user) {
      res.status(200).json({
        message: "User retrieved successfully",
        data: user,
      });
    } else {
      res.status(404).json({ message: `User with ID ${userId} not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

// Create a new user
app.post("/users", validateUser, (req, res) => {
  try {
    const { firstName, lastName, hobby } = req.body;
    const newUser = {
      id: nextId++,
      firstName,
      lastName,
      hobby,
    };
    users.push(newUser);
    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

// Update user by ID
app.put("/users/:id", validateUserUpdate, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === userId);

    // update user if found
    if (userIndex !== -1) {
      const { firstName, lastName, hobby } = req.body;
      users[userIndex] = {
        ...users[userIndex],
        firstName,
        lastName,
        hobby,
      };

      res.status(200).json({
        message: "User updated successfully",
        data: users[userIndex],
      });
    } else {
      res.status(404).json({ message: `User with ID ${userId} not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

// Delete user by ID
app.delete("/users/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1);
      res.status(200).json({
        message: "User deleted successfully",
        data: deletedUser[0],
      });
    } else {
      res.status(404).json({ message: `User with ID ${userId} not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

// handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    error: "Route Not Found",
    message: `The requested endpoint ${req.originalUrl} was not found on this server.`,
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred.",
  });
});
// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
