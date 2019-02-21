const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile',
}), (req, res) => {
  res.redirect('/');
});

router.get('/callback', (req, res, next) => {

});
