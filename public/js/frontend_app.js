console.log('loaded frontend app');

var frontend_app = angular.module('github_app', ['ngRoute']);
frontend_app.config(do_routes);

frontend_app.controller('home_controller', do_home_controller);
frontend_app.controller('login_controller', do_login_controller);
frontend_app.controller('auth_token', do_auth_token);
