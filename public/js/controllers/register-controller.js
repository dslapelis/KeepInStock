'use strict';

angular.module('Register')

  .controller('RegisterController',
              ['$http', '$scope', '$rootScope', '$location', '$uibModal', 'AuthenticationService',
               function ($http, $scope, $rootScope, $location, $uibModal, AuthenticationService) {

                 $scope.openModal = function(status){

                   if(status == 'success') {

                     $scope.modalInstance = $uibModal.open({
                       ariaLabelledBy: 'modal-title',
                       ariaDescribedBy: 'modal-body',
                       templateUrl: '/views/modals/registrationComplete.html',
                       windowClass: 'center-modal',
                       controller :'RegisterModalHandlerController',
                       controllerAs: '$ctrl',
                       size: 'lg',
                       resolve: {
                       }
                     });

                   } else {

                     $scope.modalInstance = $uibModal.open({
                       ariaLabelledBy: 'modal-title',
                       ariaDescribedBy: 'modal-body',
                       templateUrl: '/views/modals/registrationFailure.html',
                       windowClass: 'center-modal',
                       controller :'RegisterModalHandlerController',
                       controllerAs: '$ctrl',
                       size: 'lg',
                       resolve: {
                       }
                     });

                   }
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
                     var errorElement = document.querySelector('.error');
                     errorElement.classList.remove('visible');

                     if (result.token) {
                       // Use the token to create a charge or a customer
                       // https://stripe.com/docs/charges
                       $scope.token = result.token.id;
                       AuthenticationService.Register($scope.name, $scope.email, $scope.phone, $scope.password, $scope.token, function (response) {
                         if(response.data.success) {
                           $scope.name = '';
                           $scope.email = '';
                           $scope.phone = '';
                           $scope.password = '';
                           $scope.token = '';
                           card.clear();
                           $scope.openModal('success');
                         } else {
                           $scope.openModal('failure');
                         }
                       });
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

angular.module('RegisterModalHandler')
  .controller('RegisterModalHandlerController',
              function($scope, $uibModalInstance, InventoryService, InventoryNotifyingService) {

  $scope.cancelModal = function(){
    $uibModalInstance.dismiss('close');
  }
  $scope.ok = function(){
    $uibModalInstance.close('save');
  }

});