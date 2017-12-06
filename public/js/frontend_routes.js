function do_routes($routeProvider, $httpProvider) {
  $httpProvider.defaults.withCredentials = true;

  console.log('doing FE routes');
  $routeProvider
    .when(
      '/login', {
        templateUrl: 'partials/login.html',
        controller: 'login_controller'
      }
    )
    .when(
      '/', {
        templateUrl: 'partials/home.html',
        controller: 'home_controller'
      }
    )
    .when('/logged_in', {
      templateUrl: 'partials/logged_in.html'
    })
    .when('/failed', {
      templateUrl: 'partials/failed.html'
    })
    .when('/github_data', {
      templateUrl: 'partials/github_data.html',
      controller: 'github_data'
    }).when('/repositories', {
      templateUrl: 'partials/repositories.html',
      controller: 'repositories_controller'
    });
}