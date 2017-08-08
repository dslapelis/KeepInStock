'use strict';

angular.module('Customers')

    .controller('CustomersController',
    ['$http', '$scope', '$rootScope', '$location', 'AuthenticationService',
        function ($http, $scope, $rootScope, $location, AuthenticationService ) {

            // user opened the app, so we try to refresh their token
            AuthenticationService.RefreshToken();
        }]);