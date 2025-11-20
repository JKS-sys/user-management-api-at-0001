const express = require("express");

// initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON requests
app.use(express.json());

// In-memory data store for users
let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    hobbys: ["reading", "gaming"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    hobbys: ["cooking", "traveling"],
  },
];

// Hwalth check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "User Management API is running",
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
