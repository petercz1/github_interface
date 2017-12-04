var passport = require('passport');
var github_strategy = require('passport-github2');
var creds = require('./creds');

var git_creds = {
  clientID: creds.client_id,
  clientSecret: creds.client_secret,
  callbackURL: creds.callback_url
};

var git_strategy = new GitHubStrategy(git_creds, get_access);

passport.use(git_strategy);

function get_access(accessToken, refreshToken, profile, done) {
  console.log('getting access');
  console.log(profile);
  User.findOrCreate({
    githubId: profile.id
  }, function (err, user) {
    return done(err, user);
  });
}