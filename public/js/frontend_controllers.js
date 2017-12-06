function do_home_controller($scope, $http) {
  console.log('doing home controller');
}

function do_login_controller($scope, $http) {
  console.log('doing login controller');
}

function do_logged_in_controller($scope, $http) {
  console.log('doing logged in controller');
  $http.get('/api/v1/github_data')
    .then(
      function (results) {
        console.log('data from github');
        console.log(results.data);
      }
    );
}

function do_github_data($scope, $http) {
  console.log('doing github data');
}

function do_reps_controller($scope, $http){
  $http.get('/api/v1/repositories')
  .then(
    function (results) {
      console.log('data from github');
      console.log(results.data);
      $scope.reps = results.data;
    }
  );
}