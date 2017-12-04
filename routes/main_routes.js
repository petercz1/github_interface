var router = require('express').Router();
var passport = require('../mongodb/passport');
module.exports = router;

router.get('/', do_homepage);

function do_homepage(req, res) {
  console.log('doing homepage');
  res.render('index');
}

app.get('api/v1/auth', passport.authenticate('github', {
  scope: ['user:email']
}));

app.get('/api/v1/git_callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    console.log('authenticated!');
    // Successful authentication, redirect home.
    res.json({
      message: 'authenticated - proceed!'
    });
  });