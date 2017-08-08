'use strict';

angular.module('Inventory')

  .controller('InventoryController',
              ['$http', '$scope', '$rootScope', '$location', '$uibModal', 'AuthenticationService', 'InventoryService', 'InventoryNotifyingService',
               function ($http, $scope, $rootScope, $location, $uibModal, AuthenticationService, InventoryService, InventoryNotifyingService) {

                 $scope.ItemsArray = [];
                 $scope.sortType = 'title';
                 $scope.searchItems = '';
                 // user opened the app, so we try to refresh their token
                 AuthenticationService.RefreshToken();

                 // user opened the app so we populate their table with their items
                 InventoryService.RefreshItems( function(response) {
                   $scope.ItemsArray = response;
                 })
                 
                 $scope.delete = function() {
                   
                 }


                 $scope.openModal = function(){
                   $scope.modalInstance = $uibModal.open({
                     ariaLabelledBy: 'modal-title',
                     ariaDescribedBy: 'modal-body',
                     templateUrl: '/views/modals/addItem.html',
                     controller :'ModelHandlerController',
                     controllerAs: '$ctrl',
                     size: 'lg',
                     resolve: {
                     }
                   });
                 }
                 
                 InventoryNotifyingService.subscribe($scope, function somethingChanged() {
                   InventoryService.RefreshItems(function(response) {
                     $scope.ItemsArray = response;
                   })
                 });
               
               }]);

/* ----------------------------------------------------
------------------------------------------------------- 
--------------------modals section---------------------
------------------------------------------------------- 
------------------------------------------------------- */

angular.module('ModalHandler')
  .controller('ModelHandlerController',
  function($scope, $uibModalInstance, InventoryService, InventoryNotifyingService) {

  $scope.cancelModal = function(){
    $uibModalInstance.dismiss('close');
  }
  $scope.ok = function(){
    InventoryService.AddItem($scope.title, $scope.cost, $scope.price, $scope.sku, $scope.quantity, $scope.details,
    function (response) {
      if(response.data.success){
        InventoryNotifyingService.notify();
      }
    });
    $uibModalInstance.close('save');
  }

});