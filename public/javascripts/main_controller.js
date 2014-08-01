MainController = angular.module("MainController", []);

MainController.controller("mainCtrl", ["$scope", function($scope) {
  
    $scope.footer = false;

    $scope.showFooter = function() {
      $scope.footer = true;
    };

    $scope.hideFooter = function() {
      $scope.footer = false;
    };
}]);