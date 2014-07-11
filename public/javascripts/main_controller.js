MainController = angular.module("MainController", []);

MainController.controller("mainCtrl", ["$scope", "$http", "$resource", function($scope, $http, $resource) {
  
    $scope.yelp = [];
    $scope.doctors = [];
    $scope.footer = false

    var url = "http://doctorstats.herokuapp.com/api/v1/doctors.json";
    var Connection = $resource(url);

    $scope.showFooter = function() {
      $scope.footer = true;
    };

    $scope.hideFooter = function() {
      $scope.footer = false;
    };
}]);