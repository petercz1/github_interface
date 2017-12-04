var router = require('express').Router();
var passport = require('../mongodb/passport');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res) {
  console.log('doing homepage');
  res.sendfile('index.html');
}

// auth
router.get('/api/v1/auth', passport.authenticate('github', {
  scope: ['user:email']
}));

router.get('/api/v1/git_callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }), do_authenticated);

function do_authenticated(req, res) {
  console.log('authenticated!');
  // Successful authentication, redirect.
  res.json({
    message: 'authenticated - proceed!'
  });
}