function do_home_controller($scope, $http) {
  console.log('doing home controller');
}

function do_login_controller($scope, $http) {
  console.log('doing login controller');
  console.log('doing authToken stuff');
  $http.get('/authToken').then(
    function (result) {
      console.log(result.data);
    }
  )
}
