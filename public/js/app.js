'use strict';
angular.module('Authentication', []);
angular.module('Inventory', []);
angular.module('Register', []);
angular.module('ModalHandler', []);
angular.module('InventoryNotifying', []);




angular.module('keepInStockApp', [
    'Authentication',
    'Inventory',
    'Register',
    'ModalHandler',
    'InventoryNotifying',
    'ngRoute',
    'ngCookies',
    'ui.bootstrap',
    'fixed.table.header'
])

    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'AuthenticationController'
                }).
                when('/login', {
                    templateUrl: 'views/login.html',
                    controller: 'AuthenticationController'
                }).
                when('/register', {
                    templateUrl: 'views/register.html',
                    controller: 'RegisterController'
                }).
                when('/home', {
                    templateUrl: 'views/home.html',
                    controller: ''
                }).
                when('/inventory', {
                    templateUrl: 'views/inventory.html',
                    controller: 'InventoryController'
                }).
                otherwise({
                    redirectTo: '/'
                });
                $locationProvider.html5Mode({
                enabled: true,
                requireBase: false,
            });
        }])

    .run(['$rootScope', '$location', '$cookieStore', '$http',
        function ($rootScope, $location, $cookieStore, $http) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.token; // jshint ignore:line
                $rootScope.loggedIn = true;
            } else {
                $rootScope.loggedIn = false;
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() == '/home' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() == '/add' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() == '/home' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() == '/modify' && !$rootScope.globals.currentUser) {
                    $location.path('/login');
                }
            });

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ((($location.path() == '/login') || ($location.path() == '/register')) && $rootScope.globals.currentUser) {
                    $location.path('/home');
                }
            });
        }]);