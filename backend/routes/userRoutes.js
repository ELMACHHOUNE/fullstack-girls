const express = require('express');
const router = express.Router();
// Correctly import register and login from authController.js
const { register, login } = require('../controllers/authController');

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// You can add other routes here, for example:
// Example of a profile route (just for testing)
router.get('/profile', (req, res) => {
  res.send('User profile');
});

module.exports = router;
