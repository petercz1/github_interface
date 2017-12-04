function do_routes($routeProvider) {
  console.log('doing FE routes');
  $routeProvider.when(
    '/login', {
      templateUrl: 'partials/login.html',
      controller: 'login_controller'
    }
  ).when(
    '/', {
      templateUrl: 'partials/home.html',
      controller: 'home_controller'
    }
  ).when;
}