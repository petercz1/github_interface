console.log('loaded frontend app');

var frontend_app = angular.module('github_app', ['ngRoute']);
frontend_app.config(do_routes);
frontend_app.controller('home_controller', do_home_controller);

function do_login($scope, $http) {
    
}