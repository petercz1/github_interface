function do_home_controller($scope, $http) {
    console.log('doing home controller');
}

function do_login_controller($scope, $http, $routeParams, $location) {
    console.log('doing login controller');
    console.log($routeParams);
    $http.get('/api/v1/auth').then(
        function (result) {
            console.log(result);
            $location.path('logged_in'); // up to here!
        }
    )
}