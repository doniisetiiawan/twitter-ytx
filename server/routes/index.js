const express = require('express');

const router = express.Router();

const passport = require('passport');

router.get('/', (req, res) => res.send('Hello World!'));

router.get('/login', (req, res) => {
  res.send('Login Page!');
});
router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
  }),
);

router.get('/signup', (req, res) => {
  res.send('Signup Page');
});
router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
  }),
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/profile', isLoggedIn, (req, res, next) => {
  res.send('Profile Page');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
