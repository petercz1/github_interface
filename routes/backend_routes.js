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
  router.delete('/api/v1/delete/:id', do_delete);

  function do_delete(req, res) {
    console.log('deleting repository...');
    console.log(req.params);
    var delete_repository_options = {
      url: 'https://api.github.com/repos/:owner/:repo',
      headers: {
        'User-Agent': 'request'
      }
    }
    function delete_repository_callback(err, response, body) {
      if (err) console.log(err);
      //console.log(response);
      res.json({
        message: 'deleted repository'
      })
    }
    request.delete(delete_repository_options, delete_repository_callback);
  }

  function do_github_data(req, res) {
    console.log('getting all repositories...');
    console.log(req.user.id);

    var get_repositories_options = {
      url: 'https://api.github.com/user/repos?access_token=' + req.user.accessToken,
      headers: {
        'User-Agent': 'request'
      }
    }
    function get_repositories_callback(err, response, body) {
      if (err) console.log(err);
      console.log('sending reps list to frontend');
      res.json(JSON.parse(body));
    }
    request(get_repositories_options, get_repositories_callback);
  }

  function do_repositories(req, res) {
    console.log('doing repositories');
    // github returns a max of 100 per page

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
    scope: ['user:email', 'user:delete_repo']
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