const express = require('express');
const session = require('express-session');

const app = express();

// Set up session middleware
app.use(session({
  secret: 'your_secret_key', // Change this to a secure random value in production
  resave: false,
  saveUninitialized: true
}));

// Middleware to check if user is authenticated
const requireLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.redirect('/login');
  }
};

// Login route
app.get('/login', (req, res) => {
  // Simulate login logic
  req.session.user = { username: 'example_user' }; // Set user session
  res.send('Logged in successfully');
});

// Home page route - protected by requireLogin middleware
app.get('/', requireLogin, (req, res) => {
  res.send('Welcome to the home page');
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.redirect('/login');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
