var passport = require('passport');
var github_strategy = require('passport-github2');
var creds = require('./creds');


var git_strategy = new GitHubStrategy()
passport.use(new GitHubStrategy({
    clientID: creds.client_id,
    clientSecret: creds.client_secret,
    callbackURL: creds.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
