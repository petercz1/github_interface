function do_home_controller($scope, $http) {
    console.log('doing home controller');
}

function do_login_controller($scope, $http, $routeParams, $location) {
    console.log('pre login');
    console.log($routeParams);
    $http.jsonp('/api/v1/auth').then(
        function (result) {
            console.log('post login');
            console.log(result);
            $location.path('logged_in'); // up to here!
        }
    )
}