function build_passport(passport) {

  var GitHubStrategy = require('passport-github2').Strategy;
  var creds = require('./creds.js');

  var git_creds = {
    clientID: creds.client_id,
    clientSecret: creds.client_secret,
    callbackURL: creds.callback_url
  };

  function get_access(accessToken, refreshToken, profile, done) {
    console.log('getting access');
    console.log(accessToken);
    //console.log(profile);
    passport.accessToken = accessToken;
    return done(null, profile);
  }

  var git_strategy = new GitHubStrategy(git_creds, get_access);

  passport.use(git_strategy);

  passport.serializeUser(function (user, done) {
    console.log('serializing');
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    console.log('deserializing');
    console.log(obj);
    done(null, obj);
  });
  return passport;
}

module.exports = build_passport;