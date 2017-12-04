function do_home_controller($scope, $http) {
    console.log('doing home controller');
}

function do_login_controller($scope, $http, $) {
    console.log('doing login controller');
    $http.get('/api/v1/auth').then(
        function (result) {
            console.log(result);
        }
    )
}