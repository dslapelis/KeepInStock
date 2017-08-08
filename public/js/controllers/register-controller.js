'use strict';

angular.module('Register')

  .controller('RegisterController',
              ['$http', '$scope', '$rootScope', '$location', 'AuthenticationService',
               function ($http, $scope, $rootScope, $location, AuthenticationService) {

                 $scope.register = function () {
                   AuthenticationService.Register($scope.name, $scope.email, $scope.phone, $scope.password, $scope.token, function (response) {
                     if (response) {
                       console.log(response);
                     } else {
                       console.log('ok');
                     }
                   });
                 }

                 $scope.init = function() {
                   var stripe = Stripe('pk_test_89Fn7Nqjyj2bA0f5VL51kfDt');
                   var elements = stripe.elements();

                   var card = elements.create('card', {
                     style: {
                       base: {
                         iconColor: '#666EE8',
                         color: '#31325F',
                         lineHeight: '40px',
                         fontWeight: 300,
                         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                         fontSize: '15px',

                         '::placeholder': {
                           color: '#CFD7E0',
                         },
                       },
                     }
                   });
                   card.mount('#card-element');

                   function setOutcome(result) {
                     var successElement = document.querySelector('.success');
                     var errorElement = document.querySelector('.error');
                     successElement.classList.remove('visible');
                     errorElement.classList.remove('visible');

                     if (result.token) {
                       // Use the token to create a charge or a customer
                       // https://stripe.com/docs/charges
                       successElement.querySelector('.token').textContent = result.token.id;
                       $scope.token = result.token.id;
                       $scope.register($scope.name, $scope.email, $scope.password, $scope.token, function (response) {

                       });
                       successElement.classList.add('visible');
                     } else if (result.error) {
                       errorElement.textContent = result.error.message;
                       errorElement.classList.add('visible');
                     }
                   }

                   card.on('change', function(event) {
                     setOutcome(event);
                   });

                   document.querySelector('form').addEventListener('submit', function(e) {
                     e.preventDefault();
                     var form = document.querySelector('form');
                     var extraDetails = {
                       name: form.querySelector('input[name=cardholder-name]').value,
                     };
                     stripe.createToken(card, extraDetails).then(setOutcome);
                   });
                 }

                 $scope.init();

               }]);