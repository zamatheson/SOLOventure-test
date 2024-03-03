// Import necessary modules
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const User = require('./models/User'); // Import the User model

// Controller function to handle user login
exports.loginUser = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ email });

    // If user does not exist, return error
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, return error
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token and user data
    res.json({ token, user: { _id: user._id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to handle user signup
exports.signupUser = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });

    // If user already exists, return error
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const newUser = new User({ email, password: hashedPassword });

    // Save new user to the database
    await newUser.save();

    // Generate JWT token for the newly signed up user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token and success message
    res.status(201).json({ token, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
