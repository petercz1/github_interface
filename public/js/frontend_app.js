console.log('loaded frontend app');

var frontend_app = angular.module('github_app', ['ngRoute', 'ngDragDrop']);
frontend_app.config(do_routes);

frontend_app.controller('home_controller', do_home_controller);
frontend_app.controller('login_controller', do_login_controller);
frontend_app.controller('logged_in_controller', do_logged_in_controller);
frontend_app.controller('github_data', do_github_data);
frontend_app.controller('reps_controller', do_reps_controller);


