function build_router(passport) {

  var router = require('express').Router();
  var passport = require('../mongodb/passport')(passport);

  router.get('/', do_homepage);

  function do_homepage(req, res) {
    console.log('doing homepage');
    res.sendfile('index.html');
  }

  // auth

  router.get('/api/v1/auth', function (req,res,next) {
    console.log('getting auth');
    next();
  })
  router.get('/api/v1/auth', passport.authenticate('github', {
    scope: ['user:email']
  }));

  router.get('/api/v1/git_callback', function (req, res, next) {
    passport.authenticate('github', {
      successRedirect: '/logged_in',
      failureRedirect: '/failed'
    })
  });

  router.get('/failed', do_failed);
  router.get('/logged_in', do_logged_in);

  function do_failed(req, res) {
    console.log('doing failed');
    console.log(req.body);
    res.json({
      message: 'failed login'
    });
  }

  function do_logged_in(req, res) {
    console.log('doing logged in stuff');
    res.json({message: 'doing redirect?'})
  }

  function do_authenticated(req, res) {
    console.log('authenticated!');
    // Successful authentication, redirect.
    res.json({
      message: 'authenticated - proceed!'
    });
  }
  return router;
}

module.exports = build_router;