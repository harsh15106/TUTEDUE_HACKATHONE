const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../database/profile');

const JWT_SECRET = 'your_jwt_secret_key'; // Use process.env.JWT_SECRET in production

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, pass, address, identity, phone } = req.body;
    if (!username || !email || !pass || !address || !identity || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = new User({ username, email, pass: hashedPassword, address, identity, phone });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, identity: user.identity, username: user.username },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user._id, username: user.username, identity: user.identity, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// Test route (optional, for debugging)
router.get('/test', (req, res) => {
  res.send('Auth route is working!');
});

// Register
router.post('/register', async (req, res) => {
    try {
      const { username, email, pass, address, identity, phone } = req.body;
      if (!username || !email || !pass || !address || !identity || !phone) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'Email already exists' });
  
      const hashedPassword = await bcrypt.hash(pass, 10);
      const user = new User({ username, email, pass: hashedPassword, address, identity, phone });
      await user.save();
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
      // ADD THIS LINE FOR BETTER DEBUGGING
      console.error('REGISTRATION ERROR:', err); 
      
      res.status(500).json({ message: 'Registration failed', error: err.message });
    }
  });
module.exports = router;