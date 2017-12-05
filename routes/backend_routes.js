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
  }));

  router.get('/api/v1/git_callback',
    passport.authenticate('github', {
      failureRedirect: '/failed'
    }), do_logged_in);

  router.get('/failed', do_failed);

  function do_failed(req, res) {
    console.log('doing failed');
    console.log(req.body);
    res.json({
      message: 'failed login'
    });
  }

  function do_logged_in(req, res) {
    console.log('doing logged in stuff');
    res.redirect('#!/logged_in');
  }

  return router;
}

module.exports = build_router;