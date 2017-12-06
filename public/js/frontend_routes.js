function do_routes($routeProvider) {
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
    .when('/authToken',{
      controller: 'auth_token'
    });
}