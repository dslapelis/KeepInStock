'use strict';

angular.module('ModifyItem')

    .controller('ModifyItemController',
    ['$http', '$scope', '$rootScope', '$location', 'ModifyItemService',
        function ($http, $scope, $rootScope, $location, ModifyItemService) {

            var item = ModifyItemService.GetItem();
            var nullItem = {}
            if (item != null) {
                $scope.title = item.title;
                $scope.sku = item.sku;
                $scope.cost = item.purchCost;
                $scope.price = item.salePrice;
                $scope.quantity = item.quantity;
                $scope.details = item.details;
            } else {
                $location.path('/home');
            }

            $scope.saveItem = function () {
                ModifyItemService.SaveItem(item._id, this.title, this.cost, this.price, this.sku, this.quantity, this.details,
                     function(response) {
                        if (response.success) {
                            $location.path('/home');
                        }
                });
            }

        }]);