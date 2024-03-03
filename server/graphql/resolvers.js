const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET_KEY = 'your-secret-key';

module.exports = {
  signup: async ({ username, password }) => {
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ userId: newUser.id, username: newUser.username }, SECRET_KEY, { expiresIn: '1h' });
      return { userId: newUser.id, token, tokenExpiration: 3600 };
    } catch (error) {
      throw error;
    }
  },
  login: async ({ username, password }) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      return { userId: user.id, token, tokenExpiration: 3600 };
    } catch (error) {
      throw error;
    }
  }
};
