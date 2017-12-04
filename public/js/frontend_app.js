console.log('loaded frontend app');

var frontend_app = angular.module('github_app', ['ngRoute']);
frontend_app.config(do_routes);
frontend_app.controller('login', do_login);

function do_login($scope, $http) {
    
}