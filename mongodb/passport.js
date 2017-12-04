var creds = require('./creds');

passport.use(new GitHubStrategy({
    clientID: creds.client_id,
    clientSecret: creds.client_secret,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
