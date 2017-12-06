function build_router(passport) {

  var router = require('express').Router();
  var passport = require('../mongodb/passport')(passport);

  // homepage-----------------------------------
  router.get('/', do_homepage);

  function do_homepage(req, res) {
    console.log('doing homepage');
    res.sendfile('index.html');
  }
  // data---------------------------------------

  router.get('/authToken', do_authToken)

  function do_authToken(params) {
    
  }

  // auth---------------------------------------
  router.get('/api/v1/auth', passport.authenticate('github', {
    scope: ['user:email']
  }));

  router.get('/api/v1/git_callback',
    passport.authenticate('github', {
      failureRedirect: '/#!/login'
    }), do_logged_in);

  function do_logged_in(req, res) {
    console.log('doing logged in stuff');
    console.log(req.params);
    res.redirect('/#!/logged_in');
  }

  router.get('/api/v1/logout', function (req, res) {
    req.logout();
    res.redirect('/#!/');
  });

  return router;
}

module.exports = build_router;