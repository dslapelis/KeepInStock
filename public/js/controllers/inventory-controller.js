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

                 $scope.delete = function(id) {
                   InventoryService.DeleteItem(id, function (response) {
                     if(response.data.success) {
                       InventoryService.RefreshItems( function(response) {
                         $scope.ItemsArray = response;
                       })
                     }
                   });
                 }

                 $scope.openAddModal = function(){

                   $scope.modalInstance = $uibModal.open({
                     ariaLabelledBy: 'modal-title',
                     ariaDescribedBy: 'modal-body',
                     templateUrl: '/views/modals/addItem.html',
                     controller :'AddInventoryModalHandlerController',
                     controllerAs: '$ctrl',
                     size: 'lg',
                     resolve: {
                     }
                   });

                 }

                 $scope.openEditModal = function(item) {
                   $scope.modalInstance = $uibModal.open({
                     ariaLabelledBy: 'modal-title',
                     ariaDescribedBy: 'modal-body',
                     templateUrl: '/views/modals/editItem.html',
                     controller :'EditInventoryModalHandlerController',
                     controllerAs: '$ctrl',
                     size: 'lg',
                     resolve: {
                       item: function() {
                         return item
                       }
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

angular.module('AddInventoryModalHandler')
  .controller('AddInventoryModalHandlerController',
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

angular.module('EditInventoryModalHandler')
  .controller('EditInventoryModalHandlerController',
              function($scope, $uibModalInstance, InventoryService, InventoryNotifyingService, item) {
  $scope.title = item.title;
  $scope.sku = item.sku;
  $scope.quantity = item.quantity;
  $scope.cost = item.purchCost;
  $scope.price = item.salePrice;
  $scope.details = item.details;
  $scope.cancelModal = function(){
    $uibModalInstance.dismiss('close');
  }
  $scope.ok = function(){
    InventoryService.EditItem(item._id, $scope.title, $scope.cost, $scope.price, 
                              $scope.sku, $scope.quantity, $scope.details, function (response) {
      if(response.data.success) {
        InventoryNotifyingService.notify();
      }
    });
    $uibModalInstance.close('save');
  }

});