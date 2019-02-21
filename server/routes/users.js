const express = require('express');
const secured = require('./securedHelperFunction');
const router = express.Router();

router.get('/user', secured(), (req, res, next) => {
  const { _raw, _json, ...userProfile } = req.user;
  res.render('user', {
    userProfile: JSON.stringify(userProfile, null, 2),
    title: 'Profile page',
  });
});

module.exports = router;
