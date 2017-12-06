console.log('loaded frontend app');

var frontend_app = angular.module('github_app', ['ngRoute']);
frontend_app.config(do_routes);
frontend_app.config(function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    //rest of route code
})


frontend_app.controller('home_controller', do_home_controller);
frontend_app.controller('login_controller', do_login_controller);
frontend_app.controller('logged_in_controller', do_logged_in_controller);
frontend_app.controller('github_data', do_github_data);
