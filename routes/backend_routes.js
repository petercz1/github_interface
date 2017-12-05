function build_router(passport) {

  var router = require('express').Router();
  var passport = require('../mongodb/passport')(passport);

  router.get('/', do_homepage);

  function do_homepage(req, res) {
    console.log('doing homepage');
    res.sendfile('index.html');
  }

  // auth
  router.get('/api/v1/auth', passport.authenticate('github', {
    scope: ['user:email']
  }), function (req, res, next) {
    req.session.returnTo = '/#' + req.query.returnTo; 
    next();
  });

  router.get('/api/v1/git_callback', function (req, res, next) {
    passport.authenticate('github', {
      successRedirect: req.session.returnTo,
      failureRedirect: '/failed'
    })
  }, do_authenticated);

  router.get('/failed', do_failed);

  function do_failed(req, res) {
    console.log('doing failed');
    console.log(req.body);
    res.json({
      message: 'failed login'
    });
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