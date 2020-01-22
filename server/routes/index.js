const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.send('Hello World!'));

router.get('/login', (req, res) => {
  res.send('Login Page!');
});

router.get('/signup', (req, res) => {
  res.send('Signup Page');
});

router.get('/profile', (req, res) => {
  res.send('Profile Page');
});

module.exports = router;
