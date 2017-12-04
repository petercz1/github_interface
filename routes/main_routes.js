var router = require('express').Router();
var passport = require('../mongodb/passport');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res) {
  console.log('doing homepage');
  res.render('index');
}

// auth
router.get('/api/v1/auth', passport.authenticate('github', {
  scope: ['user:email']
}));

router.get('/api/v1/git_callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }), do_authorized
  function (req, res) {
    console.log('authenticated!');
    // Successful authentication, redirect home.
    res.json({
      message: 'authenticated - proceed!'
    });
  });