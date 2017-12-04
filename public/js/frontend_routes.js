function do_routes($routeProvider) {
  console.log('doing FE routes');
  $routeProvider.when(
    '/', {
      templateUrl: 'partials/home.html',
      controller: 'home_controller'
    }
  );
}