function do_home_controller($scope, $http) {
    console.log('doing home controller');
}

function do_login_controller($scope, $http, $routeParams) {
    console.log('doing login controller');
    console.log($routeParams);
    $http.get('/api/v1/auth/' + routeParams.input_user).then(
        function (result) {
            console.log(result);
        }
    )
}