var creds = require('./creds');



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
