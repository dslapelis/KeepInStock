'use strict';

angular.module('Authentication')
  .factory('AuthenticationService',
           ['$http', '$cookieStore', '$location', '$rootScope', '$timeout',
            function ($http, $cookieStore, $location, $rootScope, $timeout) {
              var service = {};

              service.RefreshToken = function () {
                $http({
                  method: 'GET',
                  url: '/api/users/refresh'
                }).then(function successCallback(response) {
                  if (response.data.token) {
                    service.ClearCredentials();
                    service.SetCredentials(response.data.token);
                  }
                }, function errorCallback(response) {
                  service.ClearCredentials();
                  $location.path('/login');
                });
              }

              service.Login = function (email, password, callback) {
                /* Use this for real authentication
                 ----------------------------------------------*/

                $http({
                  method: 'POST',
                  url: '/api/users/login',
                  data: { email: email, password: password }
                }).then(function successCallback(response) {
                  callback(response);
                }, function errorCallback(response) {
                  // none yet
                });
              };

              service.Register = function (name, email, phone, password, stripeToken, callback) {

                $http({
                  method: 'POST',
                  url: '/api/users/register',
                  data: { name: name, email: email, phone: phone, password: password, stripeToken: stripeToken }
                }).then(function successCallback(response) {
                  callback(response);
                }, function errorCallback(response) {
                  callback(response);
                });
              };

              service.SetCredentials = function (token) {
                $rootScope.globals = {
                  currentUser: {
                    token: token
                  }
                };

                $http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // jshint ignore:line
                $cookieStore.put('globals', $rootScope.globals);
              };

              service.ClearCredentials = function () {
                $rootScope.globals = {};
                $cookieStore.remove('globals');
                $http.defaults.headers.common['Authorization'] = 'Bearer ';
              };

              return service;
            }]);

angular.module('Inventory')
  .factory('InventoryService',
           ['$http', '$cookieStore', '$rootScope', '$timeout',
            function ($http, $cookieStore, $rootScope, $timeout) {
              var service = {};
              var items = [];

              service.AddItem = function (title, cost, price, sku, quantity, details, callback) {
                $http({
                  method: 'POST',
                  url: '/api/inventory/add',
                  data: { title: title, cost: cost, price: price, sku: sku, quantity: quantity, details: details }
                }).then(function successCallback(response) {
                  callback(response);
                }, function errorCallback(response) {
                  // none yet
                });
              };

              service.EditItem = function (id, title, cost, price, sku, quantity, details, callback) {
                $http({
                  method: 'POST',
                  url: '/api/inventory/edit',
                  data: { id: id, title: title, cost: cost, price: price, sku: sku, quantity: quantity, details: details }
                }).then(function successCallback(response) {
                  callback(response);
                }, function errorCallback(response) {
                  // none yet
                });
              }

              service.RefreshItems = function (callback) {
                $http({
                  method: 'GET',
                  url: '/api/inventory/list'
                }).then(function successCallback(response) {
                  items = response.data;
                  callback(response.data);
                }, function errorCallback(response) {
                  // none yet
                });
              };

              service.GetItems = function() {
                return items;
              }

              service.DeleteItem = function (itemId, callback) {

                $http({
                  method: 'POST',
                  url: '/api/inventory/remove',
                  data: { id: itemId }
                }).then(function successCallback(response) {
                  callback(response);
                }, function errorCallback(response) {
                  // none yet
                });
              };

              var passedItem = null;

              service.SaveItem = function (id, title, cost, price, sku, quantity, details, callback) {

                $http({
                  method: 'POST',
                  url: '/api/inventory/edit',
                  data: { id: id, title: title, cost: cost, price: price, sku: sku, quantity: quantity, details: details }
                }).then(function successCallback(response) {
                  callback(response);
                }, function errorCallback(response) {
                  // none yet
                });
              };

              service.SetItem = function (item) {
                passedItem = item;
              }

              service.GetItem = function () {
                return passedItem;
              }

              return service;
            }]);

angular.module('InventoryNotifying')
  .factory('InventoryNotifyingService', function($rootScope) {
  return {
    subscribe: function(scope, callback) {
      var handler = $rootScope.$on('notifying-service-event', callback);
      scope.$on('$destroy', handler);
    },

    notify: function() {
      $rootScope.$emit('notifying-service-event');
    }
  };
});
