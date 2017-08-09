'use strict';

angular.module('Authentication')

  .controller('AuthenticationController',
              ['$scope', '$rootScope', '$location', 'AuthenticationService',
               function ($scope, $rootScope, $location, AuthenticationService) {
                 
                 $scope.token = '';

                 $scope.login = function () {
                   AuthenticationService.Login($scope.email, $scope.password, function (response) {
                     if (response.data.success) {
                       AuthenticationService.SetCredentials(response.data.token);
                       $rootScope.loggedIn = true;
                       $location.path('/inventory');
                     } else {
                     }
                   });
                 };

                 $scope.logout = function () {
                   AuthenticationService.ClearCredentials();
                   $rootScope.loggedIn = false;
                   $location.path('/login');
                 }
                 
               }]);