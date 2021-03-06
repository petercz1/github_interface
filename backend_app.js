var express = require('express');
var backend_app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var routes = require('./routes/backend_routes')(passport);
var port = 4000;

//backend_app.set('view engine', 'ejs');
backend_app.use(express.static('public'));
backend_app.use(bodyParser.urlencoded({extended: true}));
backend_app.use(bodyParser.json());
backend_app.use(session({ secret: 'proper github', resave: false, saveUninitialized: false }));
backend_app.use(passport.initialize());
backend_app.use(passport.session());
backend_app.use(routes);

backend_app.listen(port, listening);
function listening() {
    console.log('broadcasting on localhost:' + port);
}
