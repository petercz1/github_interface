function build_router(passport) {

  var router = require('express').Router();
  var passport = require('../mongodb/passport')(passport);
  var request = require('request');

  // homepage-----------------------------------
  router.get('/', do_homepage);

  function do_homepage(req, res) {
    console.log('doing homepage');
    res.sendfile('index.html');
  }
  // data---------------------------------------
  router.get('/api/v1/github_data', do_github_data);

  function do_github_data(req, res) {
    console.log('doing BE github data');
    console.log(req.user.accessToken);
    var github_api_oauth = {
      token: req.user.accessToken
    }

    function callback(err, response, body) {
      if (err) console.log(err);
      console.log('body:');
      console.log(body);
      // res.json(JSON.parse(body));
      res.json(body);
    }

    var options = {
      url: 'https://api.github.com/?access_token=' + req.user.accessToken,
      headers: {
        'User-Agent': 'request'
      }
    }
    request(options, callback);

    // res.json({
    //   accessToken: req.user.accessToken
    // })
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