// validation middleware for user creation
// check if required fields are present and valid

const validateUser = (req, res, next) => {
  const { firstName, lastName, hobbys } = req.body;

  // check if all required fields are present
  if (!firstName || !lastName || !hobbys) {
    return res.status(400).json({
      error: "Validation failed",
      message: "First name, last name, and hobbys are required.",
      missingFields: {
        firstName: !firstName,
        lastName: !lastName,
        hobbys: !hobbys,
      },
    });
  }

  // Validate fields types (should be strings)
  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof hobbys !== "string"
  ) {
    return res.status(400).json({
      error: "Validation failed",
      message: "First name, last name, and hobbys must be strings.",
    });
  }

  // validate field lengths if provided
  if (firstName && firstName.trim().length === 0) {
    return res.status(400).json({
      error: "Validation failed",
      message: "First name cannot be empty or whitespace only.",
    });
  }
  if (lastName && lastName.trim().length === 0) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Last name cannot be empty or whitespace only.",
    });
  }
  if (hobbys && hobbys.trim().length === 0) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Hobbys cannot be empty or whitespace only.",
    });
  }
  // Trim whitespace from fields
  req.body.firstName = firstName.trim();
  req.body.lastName = lastName.trim();
  req.body.hobbys = hobbys.trim();

  // if validation passes, proceed to the next middleware/handler

  next();
};

// Validation middleware for user update (PUT /user/:id)
// Checks if at least one field is present and valid
const validateUserUpdate = (req, res, next) => {
  const { firstName, lastName, hobbys } = req.body;

  // check if at least one field is present
  if (!firstName && !lastName && !hobbys) {
    return res.status(400).json({
      error: "Validation failed",
      message:
        "At least one of first name, last name, or hobbys must be provided.",
    });
  }

  // Validate fields types (should be strings if they are provided)
  if (
    (firstName && typeof firstName !== "string") ||
    (lastName && typeof lastName !== "string") ||
    (hobbys && typeof hobbys !== "string")
  ) {
    return res.status(400).json({
      error: "Validation failed",
      message: "First name, last name, and hobbys must be strings.",
    });
  }

  // validate field lengths if provided
  if (firstName && firstName.trim().length === 0) {
    return res.status(400).json({
      error: "Validation failed",
      message: "First name cannot be empty or whitespace only.",
    });
  }
  if (lastName && lastName.trim().length === 0) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Last name cannot be empty or whitespace only.",
    });
  }
  if (hobbys && hobbys.trim().length === 0) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Hobbys cannot be empty or whitespace only.",
    });
  }

  // Trim whitespace from fields if they are provided
  if (firstName) req.body.firstName = firstName.trim();
  if (lastName) req.body.lastName = lastName.trim();
  if (hobbys) req.body.hobbys = hobbys.trim();

  // if validation passes, proceed to the next middleware/handler
  next();
};

module.exports = {
  validateUser,
  validateUserUpdate,
};
