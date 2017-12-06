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
  router.get('/api/v1/repositories', do_repositories);

  function do_github_data(req, res) {
    console.log('doing BE github data');
    console.log(req.user.id);
    console.log(req.user.displayName);
    console.log(req.user.username);
    console.log(req.user.profileUrl);

    var options = {
      url: 'https://api.github.com/user/repos?access_token=' + req.user.accessToken,
      headers: {
        'User-Agent': 'request'
      }
    }

    function callback(err, response, body) {
      if (err) console.log(err);
      res.json(JSON.parse(body));
    }
    request(options, callback);

  }

  function do_repositories(req, res) {
    console.log('doing repositories');
    // github returns a max of 100 in one page

    var options = {
      url: 'https://api.github.com/user/repos?access_token=' + req.user.accessToken + '&per_page=100&page=1',
      headers: {
        'User-Agent': 'request'
      }
    }

    function callback(err, response, body) {
      if (err) console.log(err);
      res.json(JSON.parse(body));
    }
    request(options, callback);
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