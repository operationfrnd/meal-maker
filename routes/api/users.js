const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const db = require('../../helpers/dbHelpers');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  const { body: { user } } = req;
  if (!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = db.saveUser(user.username, user.password, true, (err, user) => {
    db.toAuthJSON(user.username, (resp) => {
      res.json({ user: resp });
    });
  });
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  if (!user.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const currentUser = db.validatePassword(user.username, user.password, (err, user) => {
    if (user) {
      db.toAuthJSON(user.username, (resp) => {
        res.json({ user: resp });
      });
    }
  });
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return db.selectAllUsers((err, oldUsers) => {
    const user = oldUsers.filter((oldUser) => {
      return oldUser.id === id;
    })[0];
    db.toAuthJSON(user.username, (resp) => {
      res.json({ user: resp });
    });
  });
});

module.exports = router;
